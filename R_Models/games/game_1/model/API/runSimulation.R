suppressMessages(library(deSolve))
run_simulation <- function(sim_data,
                           START=0,
                           FINISH=10,
                           STEP=0.05){
  source('./R_Models/games/game_1/model/SIRModelF.R') #loads healthsim_model 
  # create a temporary global environment for the simulation data
  simd <<- new.env()

  simd$g_NUM_SECTORS    <- sim_data$g_NUM_SECTORS
  simd$g_NUM_STOCKS     <- sim_data$g_NUM_STOCKS
  simd$g_sector_names   <- sim_data$g_sector_names
  simd$g_stock_names    <- sim_data$g_stock_names
  simd$g_policy_matrix  <- sim_data$g_policy_matrix
  simd$g_countries      <- sim_data$g_countries
  simd$g_beta_reference <- sim_data$g_beta_reference
  simd$START_TIME       <- START
  simd$FINISH_TIME      <- FINISH
  simd$TIME_STEP        <- STEP


  simtime <- seq(START, FINISH, STEP)
  o<-data.frame(ode(y      = sim_data$g_stocks,
                    times  = simtime,
                    func   = healthsim_model,
                    parms  = sim_data$g_auxs,
                    method = "euler"))

  sim_data$g_final_stocks <- unlist(o[nrow(o),
                                    2:(sim_data$g_NUM_STOCKS*sim_data$g_NUM_SECTORS+1)])

  tbl_o <- dplyr::as_data_frame(o)
  
  if(!exists("sim_data$sim_output")){
     sim_data$sim_output   <- tbl_o
  }
  else{
     sim_data$sim_output   <- dplyr::add_row(sim_data$sim_output,
                                             tbl_o[2:nrow(tbl_o)])
  }
  
  # remove the simulation environment
  rm(list=ls(envir = simd),envir = simd)
  rm("simd",envir = globalenv())

  # return the data
  sim_data
}