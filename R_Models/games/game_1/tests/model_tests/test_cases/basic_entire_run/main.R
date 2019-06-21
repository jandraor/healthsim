suppressMessages(library(readr))
suppressMessages(library(jsonlite))
source("./R_Models/games/game_1/lib/srv_initialise.R")
source("./R_Models/games/game_1/lib/srv_run.R")

# Test case: Entire run with no actions from users
# Description: This test case mimics the production workflow. In the application, 
#   the instructor (front-end) sets the specs of each country
#   through the file Countries.csv, and prompts the server to initialise the model
#   In this script, Countries.csv is created based on a template file.
#   Then, in the front-end, from info sent by players,
#   which in this case are no donations & no orders,
#   the instructor creates the files: policyMatrix.csv & donations.csv
#   These two files are created from templates.
#   The simulation is performed in 20 time steps.

countries_template <- read_csv("./R_Models/games/game_1/tests/model_tests/test_cases/basic_entire_run/countries.csv", col_types = cols())
write_csv(countries_template, "././R_Models/games/game_1/model/data/Countries.csv")
initConditions <- fromJSON(srv_initialise())

simTimes <- 0:19
consoleOutput <- list()

for(i in 1:length(simTimes)) {
  policyMatrixTemplate <- read_csv("./R_Models/games/game_1/model/data/10CountryPolicyMatrixTemplate.csv", col_types = cols())
  donationsTemplate <- read_csv("./R_Models/games/game_1/model/data/10CountryDonationsTemplate.csv", col_types = cols()) %>% 
    mutate(startTime = simTimes[i], stopTime = simTimes[i] + 1)
  write_csv(policyMatrixTemplate, './R_Models/games/game_1/model/data/PolicyMatrix.csv')
  write_csv(donationsTemplate, './R_Models/games/game_1/model/data/donations.csv')
  simResult <- srv_run(simTimes[i], simTimes[i] + 1, STEP = 1 / 8)
  consoleOutput[[i]] <- fromJSON(simResult)
}

print(toJSON(consoleOutput))










