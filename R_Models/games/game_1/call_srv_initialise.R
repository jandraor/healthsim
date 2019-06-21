source("./R_Models/games/game_1/lib/srv_initialise.R")

cmd_args <- commandArgs(TRUE)

VirusSeverityProportion <- as.numeric(cmd_args[1])  # 1st parameter from command line
testMode    <- as.logical(cmd_args[2])  # 2nd parameter from command line
manualSetup <- as.logical(cmd_args[3]) # 3rd parameter from command line

if(is.na(VirusSeverityProportion)) {
  VirusSeverityProportion  <- 0
}

if(is.na(testMode)) {
  testMode  <- F
}

if(is.na(manualSetup)) {
  manualSetup <- F
}

srv_initialise(VirusSeverityProportion, testMode , manualSetup)
