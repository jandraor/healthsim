suppressMessages(library(readr))
suppressMessages(library(dplyr))
get_donations_data <- function(start, stop){
  dt <- read_csv("./R_Models/games/game_1/model/data/donationsTemplate.csv")
  dt <- mutate(dt,startTime=start,stopTime=stop)
  dt
}
