library(pysd2r)
library(dplyr)
library(readr)

#===============================================================================
conversion.table = data.frame(
  stringsAsFactors = FALSE,
  Vensim_stock = c("Infected.AntiVirals", "Infected.in.Quarantine",
                   "Infected.Severe", "Infected1", "Infected2",
                   "Long.Term.Morbidity", "NonResourceRecovery",
                   "Recovered.Anti.Virals", "Recovered.No.Intervention", "Recovered.Quarantine",
                   "Recovered.Severe", "Recovered.Vaccinated",
                   "Reported.Infection.Rate", "Resource.Aided.Recovery", "Susceptible",
                   "Financial.Resources", "Total.Financial.Resources.Received",
                   "Total.Spend.on.Antivirals",
                   "Total.Financial.Resources.Donated", "Total.Spend.on.Vaccines",
                   "Total.Spend.on.Ventilators", "Total.Vaccines.Dispensed", "Total.Vaccines.Received",
                   "Vaccine.Stockpile", "Total.Vaccines.Ordered",
                   "Total.Vaccines.Shared", "Vaccine.Supply.Line",
                   "Total.Vaccines.Spoiled", "Total.Antivirals.Dispensed",
                   "Total.Antivirals.Received", "Antiviral.Stockpile", "Total.Antivirals.Ordered",
                   "Total.Antivirals.Shared", "Antiviral.Supply.Line",
                   "Total.Antivirals.Spoiled", "Ventilators.in.Use",
                   "Total.Ventilators.Received", "Total.Ventilators.Decommissioned",
                   "Ventilator.Supply.Line", "Total.Ventilator.Orders",
                   "Total.Ventilators.Shared", "Ventilator.Stockpile"),
  R_stock = c("IAV", "IQ", "IS", "I1", "I2", "LTM", "NRR", "RAV",
              "RNI", "RQ", "RS", "RV", "RIR", "RAR", "S", "R", "TFRR",
              "TSOA", "TFRD", "TSOVAC", "TSOVEN", "TVD", "TVR", "VS",
              "TVO", "TVSHR", "VSL", "TVS", "TAVD", "TAVR", "AVS", "TAO",
              "TAVSHR", "AVSL", "TAVS", "VIU", "TVR", "TVD", "VSL",
              "TVO", "TVS", "VS"),
  Sector = c("TM", "TM", "TM", "TM", "TM", "TM", "TM", "TM", "TM",
             "TM", "TM", "TM", "TM", "TM", "TM", "FM", "FM", "FM",
             "FM", "FM", "FM", "VAC", "VAC", "VAC", "VAC", "VAC", "VAC",
             "VAC", "AVR", "AVR", "AVR", "AVR", "AVR", "AVR", "AVR",
             "VEN", "VEN", "VEN", "VEN", "VEN", "VEN", "VEN")
)
#===============================================================================

Sys.setenv(RETICULATE_PYTHON = "/usr/local/bin/python3")
file <- "./R_Models/games/game_1/model/Vensim/Game_Model_02.mdl"
py <- pysd_connect()
py <- read_vensim(py, file)
results <- run_model(py)
colnames(results) <- make.names(colnames(results))

stepSimulation <- results %>% select(conversion.table[, 1])
R_names <- data.frame(Vensim_stock = colnames(stepSimulation)) %>% 
  inner_join(conversion.table, by = "Vensim_stock") %>% 
  mutate(team.variable = paste('Alpha', Sector, R_stock, sep = "_")) %>%
  pull(team.variable)
colnames(stepSimulation) <- R_names
stepSimulation %>% bind_cols(results[,'TIME']) %>% 
  write_csv('./R_Models/games/game_1/model/Vensim/BOT/single_team_start_0_finish_1_step_1over20.csv')


initial_values <- results %>% select(conversion.table[, 1]) %>% slice(1)
R_names <- data.frame(Vensim_stock = colnames(initial_values)) %>% 
  inner_join(conversion.table, by = "Vensim_stock") %>% 
  mutate(team.variable = paste('Alpha', Sector, R_stock, sep = "_")) %>%
  pull(team.variable)
colnames(initial_values) <- R_names

write_csv(initial_values, './R_Models/games/game_1/model/Vensim/BOT/single_team_initialValues.csv')


# At this stage, start_time, stop_time and simulation step are changed manually.
# Such behaviour should be modified from parameters.



