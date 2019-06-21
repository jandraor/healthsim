srv_run <- function(start_time = 0, finish_time = 1, STEP = 1 / 4) {
  suppressMessages(library(jsonlite))
  suppressMessages(library(dplyr))
  source("./R_Models/games/game_1/getDirectory.R")
  source("./R_Models/games/game_1/utils/read_sim_data.R")
  source("./R_Models/games/game_1/utils/write_sim_data.R")
  source("./R_Models/games/game_1/utils/get_policy_matrix.R")
  source("./R_Models/games/game_1/model/API/runSimulation.R")
  source("./R_Models/games/game_1/utils/sanitiseDF.R")
  
  CURRENT_DIR <- get_Directory('current')
  sim_data <- read_sim_data(CURRENT_DIR)
  
  # get the final stocks from the previous simulation
  sim_data$g_stocks <- sim_data$g_final_stocks
  
  # load the policy matrix from PolicyMatrix.csv
  sim_data$g_policy_matrix <- get_policy_matrix(rownames(sim_data$g_policy_matrix))
  
  sim_data <- run_simulation(sim_data, START = start_time, FINISH = finish_time, STEP = STEP)
  write_sim_data(sim_data, CURRENT_DIR)
  consoleOutput <- list(bot = sim_data$sim_output %>% filter(between(time, start_time, finish_time)), # behaviour over time
                        donations = sim_data$aggregate_donations)
  consoleOutput$bot <- sanitise_df(consoleOutput$bot)
  toJSON(consoleOutput) # output sent to browser
}