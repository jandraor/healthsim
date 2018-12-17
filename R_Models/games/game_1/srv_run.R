#=======================================================================================
# Script to run a simulation. Initially should be called as
# Rscript srv_run.R <START_TIME> <FINISH_TIME>
#=======================================================================================
#source("srv_constants.R")
source("./R_Models/games/game_1/getDirectory.R")
source("./R_Models/games/game_1/utils/read_sim_data.R")
source("./R_Models/games/game_1/utils/write_sim_data.R")
source("./R_Models/games/game_1/model/API/runSimulation.R")

cmd_args <- commandArgs(TRUE)

start_time    <- as.numeric(cmd_args[1])  # 1st parameter from command line
finish_time   <- as.numeric(cmd_args[2])  # 2nd parameter from command line

#start_time <- 0; finish_time <- 1
CURRENT_DIR <- get_Directory('current')
sim_data <- read_sim_data(CURRENT_DIR)

# get the final stocks from the previous simulation
sim_data$g_stocks <- sim_data$g_final_stocks

# would also need to set the policy matrix here based on further command line inputs
# sim_data$g_policy_matrix <- sim_data$g_policy_matrix

sim_data <- run_simulation(sim_data, START = start_time, FINISH = finish_time)
sim_data

write_sim_data(sim_data, CURRENT_DIR)
