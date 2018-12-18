suppressMessages(library(dplyr))
suppressMessages(library(readr))
# This function prepares the model data
# Important outputs are:
#     g_countries      : a tibble with the country info
#     g_dm             : distance matrix for the countries
#     g_beta_reference : Beta matrix, based on contacts and distances
get_data <- function(SAMPLE=T, 
                     SAMPLE_SIZE = 2,
                     TEST_RUN = T, 
                     ALPHA = 1,
                     seed=200){
  set.seed(seed)
  #---------------------------------------------------------------------
  # STEP (1) - Get the model data
  #---------------------------------------------------------------------
  all_countries <- read_csv("./R_Models/games/game_1/model/data/Countries.csv")

  params        <- read_csv("./R_Models/games/game_1/model/data/CountryParameters.csv")

  # For benchmarking against Vensim 1-sector model
  if(TEST_RUN){
    ALPHA       <- 100
    params <- mutate(params,Minimum=TestValue,Maximum=TestValue)
    all_countries <- mutate(all_countries,
                            Population=10000,
                            Susceptible=10000)
  }

  params_info  <- read_csv("./R_Models/games/game_1/model/data/ParamDescriptions.csv")

  policies     <- read_csv("./R_Models/games/game_1/model/data/PolicyFlags.csv")

  if(SAMPLE==T){
    countries <- sample_n(all_countries,SAMPLE_SIZE) %>% arrange(Number)
  }
  else{
    countries <- all_countries %>% arrange(Number)
  }
  
  
  #---------------------------------------------------------------------------
  # STEP (2) - Create the WAIFW Beta Reference Matrix, moderated by distance
  #---------------------------------------------------------------------------
  countries$EffectiveContacts <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "EffectiveContacts")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })

  dm <- as.matrix(dist(countries[,c("xloc","yloc")]))
  colnames(dm)<-countries$Name
  rownames(dm)<-countries$Name

  ec0 <- matrix(rep(countries$EffectiveContacts,
                  length(countries$EffectiveContacts)),
                  nrow=length(countries$EffectiveContacts),byrow = T)

  # alpha parameter used to determine how quickly contact rates decay between regions
  ecm <- round(ec0*(dm+1)^-ALPHA,10)

  # setup beta as a global variable
  beta_reference <- ecm / countries$Population
  colnames(beta_reference)<-countries$Name
  rownames(beta_reference)<-countries$Name


  #---------------------------------------------------------------------------
  # STEP (3) - Create vectors with each model parameter for every country
  #---------------------------------------------------------------------------
 
  ###### Transmission Model #######
  countries$InfectiousDelay <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "InfectiousDelay")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })
  countries$MorbidityFraction <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "MorbidityFraction")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })
  countries$QuarantineDelay <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "QuarantineDelay")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })
  countries$QuarantineFraction <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "QuarantineFraction")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })
  countries$ReportingDelay <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "ReportingDelay")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })
  countries$RecoveryDelayResources <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "RecoveryDelayResources")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })

  ###### Financial Model #######
  countries$InitialFinancialResources <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "InitialFinancialResources")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })
  countries$VaccineCostPerUnit <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "VaccineCostPerUnit")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })
  countries$AntiviralCostPerUnit <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "AntiviralCostPerUnit")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })
  countries$VentilatorCostPerUnit <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "VentilatorCostPerUnit")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })

  ###### Vaccine Supply Chain Model #######
  countries$VaccineDispensingDelay <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "VaccineDispensingDelay")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })
  countries$VaccineShipmentDelay <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "VaccineShipmentDelay")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })
  countries$VaccineSpoilageFraction <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "VaccineSpoilageFraction")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })
  countries$InitVaccineStockpile <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "InitVaccineStockpile")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })

  ###### Antiviral Supply Chain Model #######
  countries$AntiviralDispensingDelay <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "AntiviralDispensingDelay")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })
  countries$AntiviralShipmentDelay <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "AntiviralShipmentDelay")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })
  countries$AntiviralSpoilageFraction <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "AntiviralSpoilageFraction")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })
  countries$InitAntiviralStockpile <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "InitAntiviralStockpile")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })

  ###### Ventilator Supply Chain Model #######
  countries$VentilatorDispensingDelay <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "VentilatorDispensingDelay")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })
  countries$VentilatorShipmentDelay <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "VentilatorShipmentDelay")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })
  countries$VentilatorSpoilageFraction <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "VentilatorSpoilageFraction")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })
  countries$InitVentilatorStockpile <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "InitVentilatorStockpile")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })
  countries$RecoveryDelayNoResources <- sapply(countries$Category, function(x){
    index <- which(params$Category==x & params$Name == "RecoveryDelayNoResources")
    runif(1,min=pull(params[index,"Minimum"]),max=pull(params[index,"Maximum"]))
  })
  #---------------------------------------------------------------------------
  # STEP (4) - Add policy variables
  #---------------------------------------------------------------------------
  #countries$VaccinationPolicy         <- pull(policies[which(policies$Name=="VaccinationPolicy"),"Value"])
  #countries$AntiviralPolicy           <- pull(policies[which(policies$Name=="AntiviralPolicy"),"Value"])
  #countries$VentilatorPolicy          <- pull(policies[which(policies$Name=="VentilatorPolicy"),"Value"])
  #countries$QuarantinePolicy          <- pull(policies[which(policies$Name=="QuarantinePolicy"),"Value"])

  countries$VaccineBudgetProportion   <- pull(policies[which(policies$Name=="VaccineBudgetProportion"),"Value"])
  countries$AntiviralBudgetProportion <- pull(policies[which(policies$Name=="AntiviralBudgetProportion"),"Value"])
  countries$VentilatorBudgetProportion <- pull(policies[which(policies$Name=="VentilatorBudgetProportion"),"Value"])
  countries$ResourcesDonated <- pull(policies[which(policies$Name=="ResourcesDonated"),"Value"])

  countries$VaccinesShared <- pull(policies[which(policies$Name=="VaccinesShared"),"Value"])
  countries$VaccinesOrdered <- pull(policies[which(policies$Name=="VaccinesOrdered"),"Value"])
  countries$VaccineUsageFraction <- pull(policies[which(policies$Name=="VaccineUsageFraction"),"Value"])


  countries$AntiviralsShared <- pull(policies[which(policies$Name=="AntiviralsShared"),"Value"])
  countries$AntiviralsOrdered <- pull(policies[which(policies$Name=="AntiviralsOrdered"),"Value"])
  countries$AntiviralsUsageFraction <- pull(policies[which(policies$Name=="AntiviralsUsageFraction"),"Value"])

  countries$VentilatorsShared <- pull(policies[which(policies$Name=="VentilatorsShared"),"Value"])
  countries$VentilatorsOrdered <- pull(policies[which(policies$Name=="VentilatorsOrdered"),"Value"])
  countries$VentilatorsUsageFraction <- pull(policies[which(policies$Name=="VentilatorsUsageFraction"),"Value"])

  #---------------------------------------------------------------------------
  # STEP (5) - Setup policy matrix which will contain user input decisions
  #---------------------------------------------------------------------------
  policy_matrix <- matrix(vector(mode = "numeric",length = nrow(policies) * nrow(countries)),
                          nrow=nrow(countries))
  rownames(policy_matrix) <- countries$Name
  colnames(policy_matrix) <- policies$Name
  for(n in colnames(policy_matrix)){
    policy_matrix[,n] <- filter(policies,Name==n) %>% select(Value) %>% pull()
  }

  #---------------------------------------------------------------------------
  # STEP 6) - Return the key variables in a list
  #---------------------------------------------------------------------------
  list(g_countries=countries,
       g_beta_reference=beta_reference,
       g_policy_matrix=policy_matrix,
       g_ecm=ecm,
       g_dm=dm)
}

