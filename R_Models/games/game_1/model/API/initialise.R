source('./R_Models/games/game_1/model/getData.R')
source('./R_Models/games/game_1/model/BuildModelF.R')
initialise <- function(g_auxs,
                       SAMPLE           = F,
                       SAMPLE_SIZE      = 2,
                       SECTORS_INFECTED = 0,
                       TEST_RUN         = F, 
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
  model_data$g_init_conds   <- sd_model$g_init_cond
  model_data$g_auxs         <- g_auxs
  
  model_data
}