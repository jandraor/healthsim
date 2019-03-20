library(pysd2r)
library(dplyr)
Sys.setenv(RETICULATE_PYTHON = "/usr/local/bin/python3")
file <- "./R_Models/games/game_1/model/Vensim/Game_Model_02.mdl"
py <- pysd_connect()
py <- read_vensim(py, file)
results <- run_model(py)

colnames(results) <- make.names(colnames(results))

transmission_stocks <- c('Susceptible', 'Infected1', 'Infected2', 
  'Infected.AntiVirals', 'Infected.in.Quarantine', 'Infected.Severe',
  'Recovered.Vaccinated', 'Recovered.Anti.Virals', 'Recovered.No.Intervention',
  'Recovered.Quarantine', 'Recovered.Severe', 'Resource.Aided.Recovery',
  'NonResourceRecovery', 'Long.Term.Morbidity', 'Reported.Infection.Rate')

financial_stocks <- c('Financial.Resources', 
  'Total.Financial.Resources.Received', 'Total.Financial.Resources.Donated',
  'Total.Spend.on.Antivirals', 'Total.Spend.on.Vaccines', 'Total.Spend.on.Ventilators')

vaccine_stocks <- c('Total.Vaccines.Dispensed', 'Total.Vaccines.Ordered',
  'Total.Vaccines.Received', 'Total.Vaccines.Shared', 'Total.Vaccines.Spoiled',
  'Vaccine.Stockpile', 'Vaccine.Supply.Line')

antiviral_stocks <- c('Total.Antivirals.Dispensed', 'Total.Antivirals.Ordered',
  'Total.Antivirals.Received', 'Total.Antivirals.Shared', 'Total.Antivirals.Spoiled',
  'Antiviral.Stockpile', 'Antiviral.Supply.Line')

ventilator_stocks <- c('Ventilators.in.Use', 'Total.Ventilator.Orders',
  'Total.Ventilators.Received', 'Total.Ventilators.Shared', 
  'Total.Ventilators.Decommissioned', 'Ventilator.Stockpile', 
  'Ventilator.Supply.Line')

transmission_sector <- results %>% select(c('TIME', transmission_stocks))
R_names <- c('S', 'I1', 'I2', 'IAV', 'IQ', 'IS', 'RV', 'RAV', 'RNI', 'RQ', 'RS', 'RAR', 
  'NRR', 'LTM', 'RIR')

new_names <- c('time', paste0('Alpha_TM_', R_names))

colnames(transmission_sector) <- new_names

write_csv(transmission_sector, 
          './R_Models/games/game_1/model/Vensim/BOT/single_team_start_0_finish_1_step_1over20.csv')

# At this stage, start_time, stop_time and simulation step are changed manually.
# Such behaviour should be modified from parameters.



