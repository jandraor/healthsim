#DEBUG_DELAYS <- list()
#--------------------------------------------------------------------------------
get_total_outflows <- function(resource){
  apply(resource,2,sum)
}
#--------------------------------------------------------------------------------
get_total_inflows <- function(resource){
  apply(resource,1,sum)
}
#--------------------------------------------------------------------------------
zidz <- function(num, denom){
  sapply(1:length(num), function(i){
    if(denom[i] == 0)
      num[i]*0 # Just to retain the vector element name
    else
      num[i]/denom[i]
  })
}

#--------------------------------------------------------------------------------
get_total_population <- function(stocks) {
  varNames <- names(stocks)
  transmissionModelVars <- varNames[str_detect(varNames, '_TM_')]
  populationVars <- transmissionModelVars[!str_detect(transmissionModelVars, 'RIR')]
  totalPopulations <- sum(stocks[populationVars])
}

#--------------------------------------------------------------------------------
update_sim_history <- function(simtime, var, values){
  for(i in seq_along(values)){
    simd$order_history <- add_row(simd$order_history,
                                  time=simtime,
                                  ModelVariable=paste(var,names(values[i]),sep="."),
                                  Value=values[i])
  }
  
  simd$order_history <- distinct(simd$order_history,time,ModelVariable,Value)
}

#--------------------------------------------------------------------------------
get_delay_flows <- function(resource, simtime, sectors, delays){
  
  flows <- sapply(seq_along(delays),function(i){
    if (simtime - (delays[i] + simd$ABS_START) < 0)
       return (0.0)
    
    lag_time <- simtime - delays[i]
    key <- paste(resource,sectors[i],sep=".")
    lag_flow <- filter(simd$order_history,
                       ModelVariable==key,
                       near(time,lag_time,tol = 0.000000001)) %>%
                select(Value) %>%
                pull()
    lag_flow
  })
  

  names(flows) <- sectors
  #cat("time = ", simtime, "delays = ", delays,"\n")
  #print(flows)
  #DEBUG_DELAYS[[length(DEBUG_DELAYS)+1]] <<- c(Time=time,flows)
  flows
}
#--------------------------------------------------------------------------------
healthsim_model <- function(time, stocks, auxs){
  with(as.list(c(stocks, auxs)),{
    # Validation variables
    TotalPopulation <- get_total_population(stocks) # it should be constant
    
    #convert the stocks vector to a 2 dimensional matrix
    states<-matrix(stocks,nrow=simd$g_NUM_SECTORS,ncol=simd$g_NUM_STOCKS)
    rownames(states) <- simd$g_sector_names
    colnames(states) <- simd$g_stock_names
    
    #-----------------------------------------------------------------------------------------------
    ### GAME INPUT PARAMETER MATRIX ###
    #-----------------------------------------------------------------------------------------------
    TotalRequiredAntiviralOrders    <- simd$g_policy_matrix[,"AntiviralsOrdered"]
    TotalRequiredVaccineOrders      <- simd$g_policy_matrix[,"VaccinesOrdered"]
    TotalRequiredVentilatorOrders   <- simd$g_policy_matrix[,"VentilatorsOrdered"]
    
    #AntiviralsReceived              <- simd$g_policy_matrix[,"AntiviralsReceived"]
    AntiviralsReceived              <- get_total_inflows(simd$aggregate_donations$antivirals)
    #VentilatorsReceived             <- simd$g_policy_matrix[,"VentilatorsReceived"] 
    VentilatorsReceived             <- get_total_inflows(simd$aggregate_donations$ventilators)
    #VaccinesReceived                <- simd$g_policy_matrix[,"VaccinesReceived"] 
    VaccinesReceived                <- get_total_inflows(simd$aggregate_donations$vaccines)
    
    #AntiviralsShared                <- simd$g_policy_matrix[,"AntiviralsShared"]
    AntiviralsShared                <- get_total_outflows(simd$aggregate_donations$antivirals)
    #VaccinesShared                  <- simd$g_policy_matrix[,"VaccinesShared"] 
    VaccinesShared                  <- get_total_outflows(simd$aggregate_donations$vaccines)
    #VentilatorsShared               <- simd$g_policy_matrix[,"VentilatorsShared"] 
    VentilatorsShared               <- get_total_outflows(simd$aggregate_donations$ventilators)
    
    #ResourcesReceived               <- simd$g_policy_matrix[,"ResourcesReceived"]
    ResourcesReceived               <- get_total_inflows(simd$aggregate_donations$financial)
    #ResourcesDonated                <- simd$g_policy_matrix[,"ResourcesDonated"]
    ResourcesDonated                <- get_total_outflows(simd$aggregate_donations$financial)

    #-----------------------------------------------------------------------------------------------
    # Equations from VENSIM
    # Theoretical Maximum Antivirals Dispensed=Infected1/Antiviral Dispensing Delay
    TheoreticalMaximumAntiviralsDispensed <- states[,"_TM_I1"]/simd$g_countries$AntiviralDispensingDelay
    
    # Maximum Antivirals Dispensed=min(Theoretical Maximum Antivirals Dispensed,Antiviral Stockpile)
    MaximumAntiviralsDispensed <- pmin(TheoreticalMaximumAntiviralsDispensed,states[,"_AVR_AVS"]) 
    
    # Actual Antiviral Fraction=zidz(Maximum Antivirals Dispensed,Infected1)*Antiviral Usage Fraction
    ActualAntiviralFraction <- zidz(MaximumAntiviralsDispensed,
                                    states[,"_TM_I1"])*simd$g_policy_matrix[,"AntiviralsUsageFraction"]
    
    
    # Theoretical Maximum Vaccines Dispensed = Susceptible/Vaccine Dispensing Delay
    TheoreticalMaximumVaccinesDispensed <- states[,"_TM_S"]/simd$g_countries$VaccineDispensingDelay
    
    # Maximum Vaccines Dispensed=min(Theoretical Maximum Vaccines Dispensed,Vaccine Stockpile)
    MaximumVaccinesDispensed <- pmin(TheoreticalMaximumVaccinesDispensed,states[,"_VAC_VS"])
    
    # Actual Vaccination Fraction=zidz(Maximum Vaccines Dispensed,Susceptible)*Vaccine Usage Fraction
    ActualVaccinationFraction <- zidz(MaximumVaccinesDispensed,
                                      states[,"_TM_S"])*simd$g_policy_matrix[,"VaccineUsageFraction"]
    
    # Theoretical Maximum Ventilators Dispensed=Infected Severe/Ventilator Dispensing Delay
    TheoreticalMaximumVentilatorsDispensed=states[,"_TM_IS"]/simd$g_countries$VentilatorDispensingDelay
    
    # Maximum Ventilators Dispensed=min(Theoretical Maximum Ventilators Dispensed,Ventilator Stockpile)
    MaximumVentilatorsDispensed <- pmin(TheoreticalMaximumVentilatorsDispensed,states[,"_VEN_VS"])
    
    # Actual Ventilator Fraction=zidz(Maximum Ventilators Dispensed,Infected Severe)
    ActualVentilatorFraction <- zidz(MaximumVentilatorsDispensed,
                                     states[,"_TM_IS"]*simd$g_policy_matrix[,"VentilatorsUsageFraction"])
    
    
    # Anti Viral Fraction=Actual Antiviral Fraction
    AntiViralFraction <- ActualAntiviralFraction
    
    # Resources for Antivirals=Financial Resources*Antiviral Budget Proportion
    ResourcesforAntivirals <- states[,"_FM_R"]*simd$g_countries$AntiviralBudgetProportion
    
    # Maximum Antivirals Purchases Possible=Resources for Antivirals/Antiviral Cost Per Unit
    MaximumAntiviralsPurchasesPossible <- ResourcesforAntivirals/simd$g_countries$AntiviralCostPerUnit
    
    # Antiviral Orders=min(Maximum Antivirals Purchases Possible,Total Required Antiviral Orders)
    AntiviralOrders <- pmin(MaximumAntiviralsPurchasesPossible,TotalRequiredAntiviralOrders)
    
    # *** (1) Change to PIPELINE DELAY ***
    # Antiviral Orders Arriving = Antiviral Supply Line/Antiviral Shipment Delay
    #FO Delay >>> AntiviralOrdersArriving <- states[,"_AVR_AVSL"]/simd$g_countries$AntiviralShipmentDelay
    
    AntiviralOrdersArriving <- get_delay_flows("AntiviralsOrdered",
                                               time,
                                               simd$g_sector_names,
                                               simd$g_countries$AntiviralShipmentDelay)
    #cat("Time = ", time, "\n")
    #print(AntiviralOrdersArriving)
    
    
    # Antiviral Spend=Antiviral Orders*Antiviral Cost Per Unit
    AntiviralSpend <- AntiviralOrders*simd$g_countries$AntiviralCostPerUnit
    
    # IRAV=Anti Viral Policy*Anti Viral Fraction*Infected1
    IRAV <- simd$g_policy_matrix[,"AntiviralPolicy"] * AntiViralFraction * states[,"_TM_I1"]
  
    # Antivirals Dispensed=IRAV
    AntiviralsDispensed <- IRAV
    
    #Antivirals Spoiled=Antiviral Stockpile*Antivirals Spoilage Fraction
    AntiviralsSpoiled <- states[,"_AVR_AVS"]*simd$g_countries$AntiviralSpoilageFraction
    
    #AVO=Antiviral Orders
    AVO <- AntiviralOrders
    
    #Infected Non Severe=Infected1+Infected2
    InfectedNonSevere <- states[,"_TM_I1"] + states[,"_TM_I2"]
    
    #Total in Recovery = "Non-Resource Recovery"+Resource Aided Recovery
    TotalinRecovery <- states[,"_TM_NRR"] + states[,"_TM_RAR"] 
    
    #Total Infected=Infected1+Infected2+Infected AntiVirals+Infected in Quarantine+Infected Severe+Infected Non Severe
    TotalInfected <- states[,"_TM_I1"]+states[,"_TM_I2"]+states[,"_TM_IQ"]+states[,"_TM_IAV"] + states[,"_TM_IS"]
    
    #Total Recovered=Recovered Severe+Recovered Quarantine+Recovered Anti Virals+Recovered No Intervention
    #                  +Recovered Vaccinated
    
    TotalRecovered <- states[,"_TM_RV"] +  states[,"_TM_RAV"] + states[,"_TM_RQ"] + states[,"_TM_RNI"] +
                       states[,"_TM_RS"]
    
    #Total Population=
    #  Susceptible+Total in Recovery+Total Infected+Total Recovered+Long Term Morbidity
    TotalPopulation <- states[,"_TM_S"] + TotalinRecovery +  TotalInfected +  TotalRecovered +  states[,"_TM_LTM"] 
    
    # Calculate force of infection using Matrices
    ForceOfInfection <- simd$g_beta_reference %*% states[,"_TM_I1"]  * Infected1_MULT  +   # Infected1  Stock
                        simd$g_beta_reference %*% states[,"_TM_I2"]  * Infected2_MULT  +   # Infected2  Stock
                        simd$g_beta_reference %*% states[,"_TM_IQ"]  * InfectedQ_MULT  +   # Quarantine Stock
                        simd$g_beta_reference %*% states[,"_TM_IAV"] * InfectedAV_MULT +   # Antiviral  Stock
                        simd$g_beta_reference %*% states[,"_TM_IS"]  * InfectedS_MULT      # Severe     Stock
    
    #IR=Susceptible*Force of Infection*(1-Virus Severity Proportion)
    
    IR <- states[,"_TM_S"]*ForceOfInfection*(1-VirusSeverityProportion)
    
    IRS <- states[,"_TM_S"]*ForceOfInfection*VirusSeverityProportion
    
    # Total Infection Rate=IR+IRS
    TotalInfectionRate <- IR + IRS
    
    # Reporting Error=Total Infection Rate-Reported Infection Rate
    ReportingError <- TotalInfectionRate - states[,"_TM_RIR"]
    
    #CIRR=Reporting Error/Reporting Delay
    CIRR <- ReportingError/simd$g_countries$ReportingDelay
    
    #DR=Morbidity Fraction*"Non-Resource Recovery"/Rec Delay No Resources
    DR <- simd$g_countries$MorbidityFraction*states[,"_TM_NRR"]/simd$g_countries$RecoveryDelayNoResources
    
    #Inc TRR=Resources Received
    IncTRR <- ResourcesReceived
    
    #Resources for Vaccines=Financial Resources*Vaccine Budget Proportion
    ResourcesforVaccines=states[,"_FM_R"] * simd$g_countries$VaccineBudgetProportion 
    
    #Maximum Vaccine Purchases Possible=Resources for Vaccines/Vaccine Cost Per Unit
    MaximumVaccinePurchasesPossible <- ResourcesforVaccines/simd$g_countries$VaccineCostPerUnit
    
    #Vaccine Orders=min(Maximum Vaccine Purchases Possible,Total Required Vaccine Orders)
    VaccineOrders <- pmin(MaximumVaccinePurchasesPossible,TotalRequiredVaccineOrders)
    
    #INC TVA=Vaccine Orders
    INCTVA <- VaccineOrders
    
    #IR1=(1-Anti Viral Policy*Anti Viral Fraction)*Infected1
    IR1 <- (1-simd$g_policy_matrix[,"AntiviralPolicy"]*AntiViralFraction)*states[,"_TM_I1"]
    
    #Ventilator Fraction=Actual Ventilator Fraction
    VentilatorFraction <- ActualVentilatorFraction
    
    #ISNR=(1-Ventilator Policy*Ventilator Fraction)*Infected Severe/Inf Delay
    ISNR <- (1-simd$g_policy_matrix[,"VentilatorPolicy"]*VentilatorFraction)*states[,"_TM_IS"]/simd$g_countries$InfectiousDelay
    
    #ISR=Ventilator Policy*Ventilator Fraction*Infected Severe/Inf Delay
    ISR <- simd$g_policy_matrix[,"VentilatorPolicy"]*VentilatorFraction*states[,"_TM_IS"]/simd$g_countries$InfectiousDelay
    
    #Resources for Ventilators=Financial Resources*Ventilator Budget Proportion
    ResourcesforVentilators <- states[,"_FM_R"]*simd$g_countries$VentilatorBudgetProportion
    
    #Maximum Ventilators Purchases Possible=Resources for Ventilators/Ventilator Cost Per Unit
    MaximumVentilatorsPurchasesPossible <- ResourcesforVentilators/simd$g_countries$VentilatorCostPerUnit
    
    #NRRR=(1-Morbidity Fraction)*"Non-Resource Recovery"/Rec Delay No Resources
    NRRR=(1-simd$g_countries$MorbidityFraction )*states[,"_TM_NRR"]/simd$g_countries$RecoveryDelayNoResources
    
    #QF=Quarantine Policy*Infected2*Quarintine Fraction/Quarantine Delay
    QF <- simd$g_policy_matrix[,"QuarantinePolicy"]*states[,"_TM_I2"]*
             simd$g_countries$QuarantineFraction/simd$g_countries$QuarantineDelay
    
    #RR=(1-Quarantine Policy*Quarintine Fraction)*Infected2/Inf Delay
    RR <-(1-simd$g_policy_matrix[,"QuarantinePolicy"]*simd$g_countries$QuarantineFraction)*
             states[,"_TM_I2"]/simd$g_countries$InfectiousDelay
    
    #RRAV=Infected AntiVirals/Inf Delay
    RRAV <- states[,"_TM_IAV"]/simd$g_countries$InfectiousDelay
    
    #RRQ=Infected in Quarantine/Inf Delay
    RRQ <- states[,"_TM_IQ"]/simd$g_countries$InfectiousDelay
    
    #RRS=Resource Aided Recovery/Rec Delay Res
    RRS <- states[,"_TM_RAR"]/simd$g_countries$RecoveryDelayResources
    
    #Vaccination Fraction=Actual Vaccination Fraction
    VaccinationFraction <- ActualVaccinationFraction
    
    # *** (2) Change to PIPELINE DELAY ***
    #Vaccine Orders Arriving=Vaccine Supply Line/Vaccine Shipment Delay
    #VaccineOrdersArriving <- states[,"_VAC_VSL"]/simd$g_countries$VaccineShipmentDelay
    VaccineOrdersArriving <- get_delay_flows("VaccinesOrdered",
                                               time,
                                               simd$g_sector_names,
                                               simd$g_countries$VaccineShipmentDelay)
    #cat("VaccineOrderArriving@Time = ", time, "\n")
    #print(VaccineOrdersArriving)
    
    
    
    #Vaccine Spend=Vaccine Orders*Vaccine Cost Per Unit
    VaccineSpend <- VaccineOrders*simd$g_countries$VaccineCostPerUnit
    
    #VR=Susceptible*Vaccination Fraction*Vaccination Policy
    VR <- states[,"_TM_S"]*simd$g_policy_matrix[,"VaccinationPolicy"]*VaccinationFraction
    
    #Vaccines Dispensed=VR
    VaccinesDispensed <- VR
    
    #Vaccines Spoiled=Vaccine Stockpile*Vaccine Spoilage Fraction
    VaccinesSpoiled <- states[,"_VAC_VS"]*simd$g_countries$VaccineSpoilageFraction
    
    #Ventilator Orders=min(Maximum Ventilators Purchases Possible,Total Required Ventilator Orders)
    VentilatorOrders <- pmin(MaximumVentilatorsPurchasesPossible,TotalRequiredVentilatorOrders)
    
    # *** (3) Change to PIPELINE DELAY ***
    #Ventilator Orders Arriving=Ventilator Supply Line/Ventilator Shipment Delay
    #VentilatorOrdersArriving <- states[,"_VEN_VSL"]/simd$g_countries$VentilatorShipmentDelay
    VentilatorOrdersArriving <- get_delay_flows("VentilatorsOrdered",
                                                time,
                                                simd$g_sector_names,
                                                simd$g_countries$VaccineShipmentDelay)
    # cat("VentilatorOrdersArriving@Time = ", time, "\n")
    # print(VentilatorOrdersArriving)
    
    
    #Ventilator Spend=Ventilator Orders*Ventilator Cost Per Unit
    VentilatorSpend <- VentilatorOrders*simd$g_countries$VentilatorCostPerUnit
    
    #Ventilators Dispensed=ISR
    VentilatorsDispensed <- ISR
    
    
    #Ventilators Freed=RRS
    VentilatorsFreed <- RRS
    
    #Ventilators Spoiled=Ventilator Stockpile*Ventilator Spoilage Fraction
    VentilatorsSpoiled <- states[,"_VEN_VS"]*simd$g_countries$VentilatorSpoilageFraction
    
    #VO=Ventilator Orders
    VO <- VentilatorOrders
    
  
    
    # Transmission Model
    d_TM_S_dt        <- -IR - IRS - VR
    d_TM_I1_dt       <- IR - IR1 - IRAV
    d_TM_I2_dt       <- IR1 - QF - RR    
    d_TM_IQ_dt       <- QF - RRQ    
    d_TM_IAV_dt      <- IRAV - RRAV   
    d_TM_IS_dt       <- IRS - ISNR - ISR  
    d_TM_RV_dt       <- VR  
    d_TM_RAV_dt      <- RRAV 
    d_TM_RQ_dt       <- RRQ  
    d_TM_RNI_dt      <- RR  
    d_TM_RAR_dt      <- ISR - RRS 
    d_TM_RS_dt       <- NRRR + RRS  
    d_TM_NRR_dt      <- ISNR - DR - NRRR  
    d_TM_LTM_dt      <- DR 
    d_TM_RIR_dt      <- CIRR
    
    # Financial  Model
    d_FM_R_dt        <- ResourcesReceived - AntiviralSpend - ResourcesDonated - VaccineSpend - VentilatorSpend 
    d_FM_TFRD_dt     <- ResourcesDonated  
    d_FM_TSOVAC_dt   <- VaccineSpend  
    d_FM_TSOA_dt     <- AntiviralSpend  
    d_FM_TSOVEN_dt   <- VentilatorSpend
    d_FM_TFRR_dt     <- IncTRR
    
    # Vaccine Model
    d_VAC_VSL_dt     <- VaccineOrders -VaccineOrdersArriving   
    d_VAC_VS_dt      <- VaccineOrdersArriving + VaccinesReceived -VaccinesDispensed -
                           VaccinesShared - VaccinesSpoiled
    d_VAC_TVSHR_dt   <- VaccinesShared  
    d_VAC_TVR_dt     <- VaccinesReceived
    d_VAC_TVD_dt     <- VaccinesDispensed  
    d_VAC_TVS_dt     <- VaccinesSpoiled
    d_VAC_TVO_dt     <- INCTVA
    
    # Antiviral Model
    d_AVR_AVSL_dt    <- AntiviralOrders-AntiviralOrdersArriving  
    d_AVR_AVS_dt     <- AntiviralOrdersArriving + AntiviralsReceived -AntiviralsDispensed - 
                                 AntiviralsShared -AntiviralsSpoiled
    d_AVR_TAVSHR_dt  <- AntiviralsShared  
    d_AVR_TAVR_dt    <- AntiviralsReceived    
    d_AVR_TAVD_dt    <- AntiviralsDispensed    
    d_AVR_TAVS_dt    <- AntiviralsSpoiled
    d_AVR_TAO_dt     <- AVO
    
    # Ventilator Model - 7 stocks
    d_VEN_VSL_dt     <- VentilatorOrders - VentilatorOrdersArriving   
    d_VEN_VS_dt      <- VentilatorOrdersArriving + VentilatorsFreed + VentilatorsReceived - 
                           VentilatorsDispensed - VentilatorsShared - VentilatorsSpoiled
    d_VEN_VIU_dt     <- VentilatorsDispensed - VentilatorsFreed  
    d_VEN_TVR_dt     <- VentilatorsReceived    
    d_VEN_TVD_dt     <- VentilatorsSpoiled     
    d_VEN_TVS_dt     <- VentilatorsShared 
    d_VEN_TVO_dt     <- VO
    
    update_sim_history(time, "VaccinesOrdered",    VaccineOrders)
    update_sim_history(time, "AntiviralsOrdered",  AntiviralOrders)
    update_sim_history(time, "VentilatorsOrdered", VentilatorOrders)
    
    list(c(d_TM_S_dt,      d_TM_I1_dt,    d_TM_I2_dt,     d_TM_IQ_dt,    d_TM_IAV_dt,   d_TM_IS_dt, 
           d_TM_RV_dt,     d_TM_RAV_dt,   d_TM_RQ_dt,     d_TM_RNI_dt,   d_TM_RAR_dt,   d_TM_RS_dt,    
           d_TM_NRR_dt,    d_TM_LTM_dt,   d_TM_RIR_dt, 
           d_FM_R_dt,      d_FM_TFRD_dt,  d_FM_TSOVAC_dt, d_FM_TSOA_dt,  
           d_FM_TSOVEN_dt, d_FM_TFRR_dt, 
           d_VAC_VSL_dt,   d_VAC_VS_dt,   d_VAC_TVSHR_dt,  d_VAC_TVR_dt,  
           d_VAC_TVD_dt,   d_VAC_TVS_dt,  d_VAC_TVO_dt,  
           d_AVR_AVSL_dt,  d_AVR_AVS_dt,  d_AVR_TAVSHR_dt, d_AVR_TAVR_dt, 
           d_AVR_TAVD_dt,  d_AVR_TAVS_dt, d_AVR_TAO_dt,
           d_VEN_VSL_dt,   d_VEN_VS_dt,   d_VEN_VIU_dt,    d_VEN_TVR_dt,  d_VEN_TVD_dt,  
           d_VEN_TVS_dt,   d_VEN_TVO_dt ), 
           TotalInfected=TotalInfected, 
           TotalPopulation=TotalPopulation,
           AntiviralsOrdered=AntiviralOrders,
           VaccinesOrdered= VaccineOrders,
           VentilatorsOrdered=VentilatorOrders,
           AntiviralOrdersArriving=AntiviralOrdersArriving,
           VaccineOrdersArriving=VaccineOrdersArriving,
           VentilatorOrdersArriving=VentilatorOrdersArriving
         ) 
  })
}
