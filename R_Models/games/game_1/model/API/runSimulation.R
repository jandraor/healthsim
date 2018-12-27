suppressMessages(library(deSolve))
suppressMessages(library(tibble))
suppressMessages(library(tidyr))
run_simulation <- function(sim_data,
                           START=0,
                           FINISH=10,
                           STEP=0.05,
                           ABS_START=0){
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
  simd$ABS_START        <- ABS_START
  
  # Note: originally the idea was to have one variable per column, but it
  # was simpler to use a tidy data structure involvin time, ModelVariable and Value
  # Old code commented out
  if("sim_output" %in% names(sim_data)){
    # Storing the cache in tidy data format
    simd$order_history <- dplyr::select(sim_data$sim_output,time,contains("Ordered.")) %>%
                          tidyr::gather(key = ModelVariable,value = Value,-1)
    #order alphabetically
    #simd$order_history <- select(simd$order_history,sort(colnames(simd$order_history)))
    #simd$order_history <- select(simd$order_history,time,everything())
    #browser()
  }
  else{
    # Need to create an empty tibble here with the correct columns
    #v_list <- colnames(sim_data$g_policy_matrix)[str_detect( colnames(sim_data$g_policy_matrix),"Ordered")]
    #col_names <- c("time",do.call(paste0,expand.grid(paste0(v_list,"."),sim_data$g_sector_names)))
    simd$order_history <- tibble(time=numeric(),ModelVariable=numeric(), Value=numeric())
    
    # Add the columns to the tibble using !! operator
    #for(i in seq_along(col_names)){
    #  simd$order_history <- add_column(simd$order_history,!!col_names[i])
    #}
    # convert all columns to numeric
    #simd$order_history <- simd$order_history %>% mutate_all(funs(as.numeric))
    # order alphabetically
    #simd$order_history <- select(simd$order_history,sort(colnames(simd$order_history)))
  }
  
  simtime <- seq(START, FINISH, STEP)
  o<-data.frame(ode(y      = sim_data$g_stocks,
                    times  = simtime,
                    func   = healthsim_model,
                    parms  = sim_data$g_auxs,
                    method = "euler"))

  sim_data$g_final_stocks <- unlist(o[nrow(o),
                                    2:(sim_data$g_NUM_STOCKS*sim_data$g_NUM_SECTORS+1)])

  tbl_o <- dplyr::as_data_frame(o)
  
  #if(!exists("sim_data$sim_output"))
  
  if(!("sim_output" %in% names(sim_data))){
     sim_data$sim_output   <- tbl_o
  }
  else{
     sim_data$sim_output   <- dplyr::bind_rows(sim_data$sim_output,
                                               slice(tbl_o,2:nrow(tbl_o)))
  }
  
  # remove the simulation environment
  rm(list=ls(envir = simd),envir = simd)
  rm("simd",envir = globalenv())


  # return the data
  sim_data
}