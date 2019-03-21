#=======================================================================================
# FIRST script to be called
# Script to initialise the simulation
#=======================================================================================
suppressMessages(library(jsonlite))
source("./R_Models/games/game_1/utils/initialise_sim_data.R")
source("./R_Models/games/game_1/utils/write_sim_data.R")
source("./R_Models/games/game_1/model/API/initialise.R")
source("./R_Models/games/game_1/getDirectory.R")

cmd_args <- commandArgs(TRUE)
VirusSeverityProportion <- as.numeric(cmd_args[1])  # 1st parameter from command line
testMode <- as.logical(cmd_args[2])  # 2nd parameter from command line

if(is.na(VirusSeverityProportion)) {
  VirusSeverityProportion <- 0
}

if(is.na(testMode)) {
  testMode <- FALSE
}

g_auxs            <- c(VirusSeverityProportion = VirusSeverityProportion,
                       Infected1_MULT=1.0,
                       Infected2_MULT=1.0,
                       InfectedAV_MULT=0.0,
                       InfectedQ_MULT=0.0,
                       InfectedS_MULT=1.0)

# With SAMPLE=F, all of the countries are initialised.
CURRENT_DIR <- get_Directory('current')

initialisation_result <- initialise_sim_data(CURRENT_DIR)

sim_data <- initialise(g_auxs,ALPHA = 1, TEST_RUN = testMode)

sim_data$g_final_stocks <- sim_data$g_stocks

write_sim_data(sim_data, CURRENT_DIR)

if(testMode == FALSE) {
  toJSON(sim_data$g_countries)
}

if(testMode == TRUE) {
  consoleOutput <- list(stocks = as.list(sim_data$g_stocks),
    countries = sim_data$g_countries)
  toJSON(consoleOutput, auto_unbox = TRUE)
}

