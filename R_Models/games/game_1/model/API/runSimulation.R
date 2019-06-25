suppressMessages(library(deSolve))
suppressMessages(library(tibble))
suppressMessages(library(tidyr))
suppressMessages(library(purrr))
suppressMessages(library(dplyr))

run_simulation <- function(sim_data,
                           START=0,
                           FINISH=10,
                           STEP=0.05,
                           ABS_START=0,
                           development = FALSE){
  source('./R_Models/games/game_1/model/SIRModelF.R') #loads healthsim_model 
  source('./R_Models/games/game_1/utils/get_donations_data.R') #loads get_donations_data 
  source('./R_Models/games/game_1/utils/convert_donatons_to_list.R')
  source('./R_Models/games/game_1/utils/intraStepInterpolation.R')
  
    production <- !development
  
  # create a temporary global environment for the simulation data
  simd <<- new.env()

  simd$g_NUM_SECTORS       <- sim_data$g_NUM_SECTORS
  simd$g_NUM_STOCKS        <- sim_data$g_NUM_STOCKS
  simd$g_sector_names      <- sim_data$g_sector_names
  simd$g_stock_names       <- sim_data$g_stock_names
  simd$g_policy_matrix     <- sim_data$g_policy_matrix
  simd$g_countries         <- sim_data$g_countries
  simd$g_beta_reference    <- sim_data$g_beta_reference
  simd$START_TIME          <- START
  simd$FINISH_TIME         <- FINISH
  simd$TIME_STEP           <- STEP
  simd$ABS_START           <- ABS_START
  
  if(production){
    # get the donations data
    current_donations <- get_donations_data(START, FINISH)
  }
  
  if(development) {
    current_donations <- get_donations_data(START, 
                                            FINISH, 
                                            development = TRUE,
                                            countries = sim_data$g_sector_names)
  }
  
  simd$current_donations   <- current_donations
  simd$aggregate_donations <- convert_donations_to_list(current_donations)

  # Note: originally the idea was to have one variable per column, but it
  # was simpler to use a tidy data structure involving time, ModelVariable and Value
  # Old code commented out
  if("sim_output" %in% names(sim_data)){
    # Storing the cache in tidy data format
    simd$order_history <- dplyr::select(sim_data$sim_output,time,contains("Ordered.")) %>%
                          tidyr::gather(key = ModelVariable,value = Value,-1)

    # RK4 integration methods uses a midpoint step 
    simd$order_history <- intraStepInterpolation(simd$order_history, STEP)

    
    #order alphabetically
    #simd$order_history <- select(simd$order_history,sort(colnames(simd$order_history)))
    #simd$order_history <- select(simd$order_history,time,everything())
    
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
                    method = "rk4"))

  sim_data$g_final_stocks <- unlist(o[nrow(o),
                                    2:(sim_data$g_NUM_STOCKS*sim_data$g_NUM_SECTORS+1)])

  tbl_o <- dplyr::as_tibble(o)
  
  if(sim_data$g_NUM_SECTORS == 1) {
    tbl_o <- tbl_o %>% rename(Alpha_TotalInfected = TotalInfected,
                     Alpha_TotalPopulation = TotalPopulation)
  }
  
  #if(!exists("sim_data$sim_output"))
  
  if(!("sim_output" %in% names(sim_data))){
     sim_data$sim_output   <- tbl_o
     sim_data$donations    <- current_donations
  } else {
    currentSimOutput <- sim_data$sim_output[-nrow(sim_data$sim_output), ]
    sim_data$sim_output   <- bind_rows(currentSimOutput, tbl_o)
    
    sim_data$donations    <- bind_rows(sim_data$donations,
                                       current_donations)
  }
  
  # remove the simulation environment
  rm(list=ls(envir = simd),envir = simd)
  rm("simd",envir = globalenv())



  # aggregate all the donations into a set of 4 resource matrices
  # Note by default spread orders the columns by factor (a-z)
  # Order may be different to that contained in countries.csv
  # Test data
  # sim_data$donations$amount <- sample(c(100,200,300,400),length(sim_data$donations$amount),replace = T)
  
  # create the output list of matrices
  #sim_data$aggregate_donations <- map(unique(sim_data$donations$resource),function(res){
  #  df1         <- filter(sim_data$donations,resource==res)
  #  agg_df1     <- df1 %>% group_by(from, to, resource) %>% summarise(amount=sum(amount))
  #  spr_df1     <- spread(agg_df1,key=to,value=amount)
  #  mat_spr_df1 <- as.matrix(spr_df1[,-(1:2)])
  #  rownames(mat_spr_df1) <- colnames(mat_spr_df1)
  #  mat_spr_df1
  #})
  #names(sim_data$aggregate_donations) <- unique(sim_data$donations$resource)
  # factoring code to function
  sim_data$aggregate_donations <- convert_donations_to_list(sim_data$donations)
  
  # return the data
  sim_data
}