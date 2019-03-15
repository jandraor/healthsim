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

transmission_sector <- results %>% select(c('TIME', transmission_stocks))
R_names <- c('S', 'I1', 'I2', 'IAV', 'IQ', 'IS', 'RV', 'RAV', 'RNI', 'RQ', 'RS', 'RAR', 
  'NRR', 'LTM', 'RIR')

new_names <- c('time', paste0('Alpha_TM_', R_names))

colnames(transmission_sector) <- new_names

write_csv(transmission_sector, 
          './R_Models/games/game_1/model/Vensim/BOT/single_team_start_0_finish_1_step_1over20.csv')

# At this stage, start_time, stop_time and simulation step are changed manually.
# Such behaviour should be modified from parameters.



