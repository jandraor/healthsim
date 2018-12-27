suppressMessages(library(readr))
get_policy_matrix <- function(countries){
  n_countries <- length(countries)
  policyData <- read_csv("./R_Models/games/game_1/model/data/PolicyMatrixTemplate.csv")
  pm <- as.matrix(policyData %>% slice(1:n_countries))
  rownames(pm) <- countries
  pm
}