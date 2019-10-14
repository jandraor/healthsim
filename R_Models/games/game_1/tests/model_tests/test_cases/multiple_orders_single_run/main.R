suppressMessages(library(readr))
suppressMessages(library(jsonlite))
source("./R_Models/games/game_1/lib/srv_initialise.R")
source("./R_Models/games/game_1/lib/srv_run.R")

# Test case: Spend all financial resources in orders
# Description: Alpha buys antivirals, vaccines & ventilators.
#   This test case mimics the production workflow. In the application, 
#   the instructor (front-end) sets the specs of each country
#   through the file Countries.csv, and prompts the server to initialise the model
#   In this script, Countries.csv is created based on a template file.
#   Then, in the front-end, from info sent by the player,
#   the instructor creates the files: policyMatrix.csv & donations.csv
#   These two files are created from templates.
#   policyMatrix.csv includes the orders.

countries_template <- read_csv("./R_Models/games/game_1/tests/model_tests/test_cases/multiple_orders_single_run/Countries.csv", col_types = cols())
write_csv(countries_template, "././R_Models/games/game_1/model/data/Countries.csv")
initConditions <- fromJSON(srv_initialise())
policyMatrixTemplate <- read_csv("./R_Models/games/game_1/tests/model_tests/test_cases/multiple_orders_single_run/PolicyMatrix.csv", col_types = cols())
donationsTemplate <- read_csv("./R_Models/games/game_1/model/data/10CountryDonationsTemplate.csv", col_types = cols())
write_csv(policyMatrixTemplate, './R_Models/games/game_1/model/data/PolicyMatrix.csv')
write_csv(donationsTemplate, './R_Models/games/game_1/model/data/donations.csv')

simResult <- srv_run(0, 1, STEP = 1 / 32, INT_METHOD = 'euler')
print(simResult)



