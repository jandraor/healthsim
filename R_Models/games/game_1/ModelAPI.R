#----------------------------------------------------------------------------------------------------
initialise <- function(SAMPLE           = T,
                       SAMPLE_SIZE      = 2,
                       SECTORS_INFECTED = 1,
                       TEST_RUN         = T, 
                       ALPHA            = 1, 
                       seed             = 200){
  
  model_data <- get_data(SAMPLE      = SAMPLE,
                         SAMPLE_SIZE = SAMPLE_SIZE,
                         TEST_RUN    = TEST_RUN, 
                         ALPHA       = ALPHA,
                         seed        = seed)
  
  sd_model   <- build_model(model_data$g_countries)
  
  model_data$g_stocks       <- sd_model$g_stocks
  model_data$g_NUM_SECTORS  <- sd_model$g_NUM_SECTORS
  model_data$g_NUM_STOCKS   <- sd_model$g_NUM_STOCKS
  model_data$g_sector_names <- sd_model$g_sector_names
  model_data$g_stock_names  <- sd_model$g_stock_names 

  model_data
}

#----------------------------------------------------------------------------------------------------
run_simulation <- function(g_auxs, 
                           sim_data, 
                           START=0, 
                           FINISH=10, 
                           STEP=0.125){
  # create a temporary global environment for the simulation data
  simd <<- new.env()

  simd$g_NUM_SECTORS    <- sim_data$g_NUM_SECTORS
  simd$g_NUM_STOCKS     <- sim_data$g_NUM_STOCKS
  simd$g_sector_names   <- sim_data$g_sector_names
  simd$g_stock_names    <- sim_data$g_stock_names
  simd$g_policy_matrix  <- sim_data$g_policy_matrix
  simd$g_countries      <- sim_data$g_countries
  simd$g_beta_reference <- sim_data$g_beta_reference 
  
  
  simtime <- seq(START, FINISH, STEP)
  o<-data.frame(ode(y      = sim_data$g_stocks, 
                    times  = simtime, 
                    func   = healthsim_model, 
                    parms  = g_auxs, 
                    method = "euler")) 

  sim_data$g_final_stocks <- unlist(o[nrow(o),
                                    2:(sim_data$g_NUM_STOCKS*sim_data$g_NUM_SECTORS+1)])
  
  #sim_data$sim_output   <- o
  
  # remove the simulation environment
  rm(list=ls(envir = simd),envir = simd)
  rm("simd",envir = globalenv())
  
  # return the data
  sim_data
}