suppressMessages(library(readr))
suppressMessages(library(jsonlite))
suppressMessages(library(purrr))
suppressMessages(library(ggplot2))
suppressMessages(library(scales))
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


time_game_execution <- function(STEP, int_method) {
  countries_template <- read_csv("./R_Models/games/game_1/tests/performance/basic_entire_run/countries.csv", col_types = cols())
  write_csv(countries_template, "././R_Models/games/game_1/model/data/Countries.csv")
  initConditions <- fromJSON(srv_initialise())
  simTimes <- 0:19
  consoleOutput <- list()
  
  execution_time <- system.time({
    for(i in 1:length(simTimes)) {
      policyMatrixTemplate <- read_csv("./R_Models/games/game_1/model/data/10CountryPolicyMatrixTemplate.csv", col_types = cols())
      donationsTemplate <- read_csv("./R_Models/games/game_1/model/data/10CountryDonationsTemplate.csv", col_types = cols()) %>% 
        mutate(startTime = simTimes[i], stopTime = simTimes[i] + 1)
      write_csv(policyMatrixTemplate, './R_Models/games/game_1/model/data/PolicyMatrix.csv')
      write_csv(donationsTemplate, './R_Models/games/game_1/model/data/donations.csv')
      simResult <- srv_run(simTimes[i], simTimes[i] + 1, STEP = STEP, INT_METHOD = int_method)
      consoleOutput[[i]] <- fromJSON(simResult)
    }
  })
  
  bot_last_round <- consoleOutput[[20]]$bot
  bot_last_row   <- bot_last_round[nrow(bot_last_round), ]
  checksum      <- bot_last_row$Alpha_FM_COC
  list(execution_time = execution_time, checksum = checksum)
}

base_run <- time_game_execution(1 / 8, 'rk4')
baseline <- base_run$checksum
basetime <- base_run$execution_time['elapsed']

dts <- c(1 / 2, 1 / 4, 1 / 8, 1 / 16, 1 / 32, 1 / 64, 1 / 128)

euler_results <- map(dts, time_game_execution, int_method = 'euler')

euler_results_df <- map_df(euler_results, function(l) {
  data.frame(time = l$execution_time['elapsed'],
             checksum = l$checksum)
}) %>% mutate(DT = dts, 
              relative_error = abs(checksum - baseline) / baseline,
              relative_time_diff =  time / basetime)

g <- ggplot(euler_results_df, aes(x = as.factor(DT), y = relative_error)) +
  geom_point(aes(size = relative_time_diff)) +
  scale_y_continuous(labels = percent) +
  geom_text(aes(label = round(relative_time_diff, 2) ), nudge_y = 0.0015) +
  geom_hline(yintercept = 0.01, linetype="dashed", color = "red") +
  theme_minimal()












