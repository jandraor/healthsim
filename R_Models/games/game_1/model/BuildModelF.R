build_model <- function (g_countries, SAMPLE, SECTORS_INFECTED = 0 ){
  
  tm_model_stocks <- c("_TM_S","_TM_I1","_TM_I2","_TM_IQ","_TM_IAV","_TM_IS","_TM_RV","_TM_RAV","_TM_RQ","_TM_RNI",
                       "_TM_RAR","_TM_RS","_TM_NRR","_TM_LTM", "_TM_RIR")
  tm_model_desc <- c("Susceptible","Infected1","Infected2")

  fm_model_stocks <- c("_FM_R","_FM_TFRD","_FM_TSOVAC","_FM_TSOA","_FM_TSOVEN","_FM_TFRR")

  vac_model_stocks <- c("_VAC_VSL","_VAC_VS","_VAC_TVSHR","_VAC_TVR","_VAC_TVD","_VAC_TVS", "_VAC_TVO")

  av_model_stocks <- c("_AVR_AVSL","_AVR_AVS","_AVR_TAVSHR","_AVR_TAVR","_AVR_TAVD","_AVR_TAVS","_AVR_TAO")

  ven_model_stocks <- c("_VEN_VSL","_VEN_VS","_VEN_VIU","_VEN_TVR","_VEN_TVD","_VEN_TVS","_VEN_TVO")
  
  cost_model_stocks <- c("_CDL")

  all_model_stocks <- c(tm_model_stocks,fm_model_stocks,vac_model_stocks,av_model_stocks,ven_model_stocks,cost_model_stocks)

  NUM_SECTORS <- nrow(g_countries)
  NUM_STOCKS  <- length(all_model_stocks)

  init_cond <- matrix(rep(0,NUM_SECTORS*NUM_STOCKS),nrow=NUM_SECTORS)
  rownames(init_cond) <- g_countries$Name
  colnames(init_cond) <- all_model_stocks

  # INITIALISE suceptible values
  init_cond[,"_TM_S"] <- g_countries$Susceptible

  # INITIALISE patient 0 to infected sectors
  if(SAMPLE){
     patient_0_name <- sample_n(g_countries,SECTORS_INFECTED)$Name
     init_cond[patient_0_name,"_TM_S"]  <- init_cond[patient_0_name,"_TM_S"]  - 1
     init_cond[patient_0_name,"_TM_I1"] <- init_cond[patient_0_name,"_TM_I1"] + 1
  }
  else{
    # INITIALISE suceptible values
    init_cond[,"_TM_I1"] <- g_countries$Infected
  }

  # INITIALISE financial resources
  init_cond[,"_FM_R"]  <- g_countries$InitialFinancialResources

  # INITIALISE Vaccine stockpile 
  init_cond[,"_VAC_VS"]  <- g_countries$InitVaccineStockpile

  # INITIALISE AntiViral stockpile
  init_cond[,"_AVR_AVS"]  <- g_countries$InitAntiviralStockpile

  # INITIALISE Ventilator stockpile)
  init_cond[,"_VEN_VS"]  <- g_countries$InitVentilatorStockpile

  # Step: Create a single stock vector
  stocks <- c(init_cond)
  stock_names <- do.call(paste0,expand.grid(g_countries$Name,all_model_stocks))
  names(stocks) <- stock_names

  # Return variables as a list
  list(g_stocks=stocks,
       g_init_cond=init_cond,
       g_NUM_SECTORS=NUM_SECTORS,
       g_NUM_STOCKS=NUM_STOCKS,
       g_sector_names=g_countries$Name,
       g_stock_names=all_model_stocks)
}
