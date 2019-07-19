suppressMessages(library(readr))
suppressMessages(library(jsonlite))
source("./R_Models/games/game_1/lib/srv_initialise.R")
source("./R_Models/games/game_1/lib/srv_run.R")

# Test case: Entire run with orders at time 0 & time 3
# Description: This test case starts with a manual country specification.
#   Unlike the case where the instructor (front-end) sets the specs of each country
#   through the file Countries.csv, and prompts the server to initialise the model
#   with random values, all specifications in this case are deterministic.
#   Countries.csv file is used to prevent the script throwing an error. However,
#   its values are overriden by another file (see below).
#   Spoilages rates are 0 for this test case.
#   from the file 'countries_MOCKUP.csv' in this folder.
#   Then, in the front-end, from info sent by players,
#   in the first team, Alpha places orders for all resources.
#   With that information, the instructor creates the files: policyMatrix.csv & donations.csv
#   These two files are created from templates.
#   The simulation is performed in 20 time steps.

countries_template <- read_csv("./R_Models/games/game_1/tests/model_tests/test_cases/two_orders_manual_init_entire_run/countries.csv", col_types = cols())
write_csv(countries_template, "./R_Models/games/game_1/model/data/Countries.csv")
countries_mock_up <- read_csv("./R_Models/games/game_1/tests/model_tests/test_cases/two_orders_manual_init_entire_run/Countries_MOCKUP.csv", col_types = cols())
write_csv(countries_mock_up, "./R_Models/games/game_1/model/data/countries_MOCK_UP.csv")
initConditions <- fromJSON(srv_initialise(0, T, T))

simTimes <- 0:19
consoleOutput <- list(initConditions = initConditions, simResult = list())

for(i in 1:length(simTimes)) {
  policyMatrixTemplate <- read_csv("./R_Models/games/game_1/model/data/10CountryPolicyMatrixTemplate.csv", col_types = cols())
  if(simTimes[i] == 0 | simTimes[i] == 3){
    # Alpha is the first row
    policyMatrixTemplate <- policyMatrixTemplate %>% 
      mutate(VaccinesOrdered = replace(VaccinesOrdered, row_number(VaccinesOrdered) == 1, 30),
             AntiviralsOrdered = replace(AntiviralsOrdered, row_number(AntiviralsOrdered) == 1, 20),
             VentilatorsOrdered = replace(VentilatorsOrdered, row_number(VentilatorsOrdered) == 1, 5))
    
  }
  donationsTemplate <- read_csv("./R_Models/games/game_1/model/data/10CountryDonationsTemplate.csv", col_types = cols()) %>% 
    mutate(startTime = simTimes[i], stopTime = simTimes[i] + 1)
  write_csv(policyMatrixTemplate, './R_Models/games/game_1/model/data/PolicyMatrix.csv')
  write_csv(donationsTemplate, './R_Models/games/game_1/model/data/donations.csv')
  simResult <- srv_run(simTimes[i], simTimes[i] + 1, STEP = 1 / 8, INT_METHOD = 'rk4')
  consoleOutput$simResult[[i]] <- fromJSON(simResult)
}

print(toJSON(consoleOutput))










