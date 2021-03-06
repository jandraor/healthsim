suppressMessages(library(readr))
suppressMessages(library(jsonlite))
suppressMessages(library(dplyr))
source("./R_Models/games/game_1/lib/srv_initialise.R")
source("./R_Models/games/game_1/lib/srv_run.R")

cmd_args <- commandArgs(TRUE)

# 1st parameter from command line
finish_time    <- ifelse(is.na(as.numeric(cmd_args[1])), 
                         10, as.numeric(cmd_args[1]))
# 2nd parameter from command line
step           <- ifelse(is.na(as.numeric(cmd_args[2])), 
                         1 / 32, as.numeric(cmd_args[2]))
# 3rd parameter from command line
int_method     <- ifelse(is.na(cmd_args[3]), 
                         'euler', cmd_args[3])

# 4th parameter from command line
VSP            <- ifelse(is.na(as.numeric(cmd_args[4])), 
                        0, as.numeric(cmd_args[4]))

initConditions <- fromJSON(srv_initialise(VirusSeverityProportion = VSP))
teams          <- initConditions$Name
n_teams        <- nrow(initConditions)

simTimes <- 0:(finish_time - 1)
consoleOutput <- list()

for(i in 1:length(simTimes)) {
  policyMatrixTemplate <- read_csv("./R_Models/games/game_1/model/data/10CountryPolicyMatrixTemplate.csv", 
                                   col_types = cols()) %>% slice(1:n_teams)
  donationsTemplate    <- read_csv("./R_Models/games/game_1/model/data/10CountryDonationsTemplate.csv", 
                                   col_types = cols()) %>% 
    filter(from %in% teams, to %in% teams)
  write_csv(policyMatrixTemplate, './R_Models/games/game_1/model/data/PolicyMatrix.csv')
  write_csv(donationsTemplate, './R_Models/games/game_1/model/data/donations.csv')
  simResult <- srv_run(simTimes[i], simTimes[i] + 1, STEP = step, INT_METHOD = int_method)
  consoleOutput[[i]] <- fromJSON(simResult)
}

print(toJSON(consoleOutput))



