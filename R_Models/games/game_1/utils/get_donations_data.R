suppressMessages(library(readr))
get_donations_data <- function(countries){
  dt <- read_csv("./R_Models/games/game_1/model/data/donationsTemplate.csv")
  dt
}
