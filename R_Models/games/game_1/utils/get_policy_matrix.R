get_policy_matrix <- function(countries){
  pm <- as.matrix(read_csv("./R_Models/games/game_1/model/data/PolicyMatrix.csv"))
  rownames(pm) <- countries
  pm
}