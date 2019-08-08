suppressMessages(library(readr))
suppressMessages(library(jsonlite))
source("./R_Models/games/game_1/lib/srv_initialise.R")
source("./R_Models/games/game_1/lib/srv_run.R")

# Test case: Donate all physical resources in a single step
# Description: All teams but Kappa, donate all their physical resources to Kappa.
#   This test case mimics the production workflow. In the application, 
#   the instructor (front-end) sets the specs of each country
#   through the file Countries.csv, and prompts the server to initialise the model
#   In this script, Countries.csv is created based on a template file.
#   Then, in the front-end, from info sent by the player,
#   the instructor creates the files: policyMatrix.csv & donations.csv
#   These two files are created from templates.
#   donations.csv is altered to incorporate the aforementioned scenario.

countries_template <- read_csv("./R_Models/games/game_1/tests/model_tests/test_cases/donate_all_single_run/countries.csv", col_types = cols())
write_csv(countries_template, "././R_Models/games/game_1/model/data/Countries.csv")
initConditions <- fromJSON(srv_initialise())
policyMatrixTemplate <- read_csv("./R_Models/games/game_1/model/data/10CountryPolicyMatrixTemplate.csv", col_types = cols())
donationsTemplate <- read_csv("./R_Models/games/game_1/model/data/10CountryDonationsTemplate.csv", col_types = cols())

resources <- c("Antivirals", "Vaccines", "Ventilators")
donors <- with(initConditions, Name[Name != 'Kappa'])
recipient <- 'Kappa'


for(i in 1:length(resources)) {
  donResource <- resources[i]
  
  for(j in 1:length(donors)) {
    donor <- donors[j]
    prefix <- substr(donResource, 1, nchar(donResource) - 1)
    spoilageRateVar <- paste0(prefix, 'SpoilageFraction')
    spoilageRate <- initConditions %>% filter(Name == donor) %>% pull(spoilageRateVar)
    initResourceVar <- paste0("Init", prefix, "Stockpile")
    initResource <- initConditions %>% filter(Name == donor) %>% pull(initResourceVar)
    # 0.997 is used to offset Euler integration error & prevent negative values
    val <- floor((spoilageRate * initResource * exp(-1 * spoilageRate * 1)) / (1 - exp(- 1 * spoilageRate * 1))) * 0.997
    donationsTemplate <- donationsTemplate %>% 
      mutate(amount = replace(amount, resource == donResource & from == donor & to == recipient, val))
  }
}

write_csv(policyMatrixTemplate, './R_Models/games/game_1/model/data/PolicyMatrix.csv')
write_csv(donationsTemplate, './R_Models/games/game_1/model/data/donations.csv')

simResult <- srv_run(STEP = 1 / 32, INT_METHOD = 'euler')
print(simResult)



