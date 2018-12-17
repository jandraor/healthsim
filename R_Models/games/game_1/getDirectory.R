get_Directory <- function(typeDir) {
  if (typeDir == 'current'){
    directory <- "./R_Models/games/game_1/sim_data/current/"
  }
  if(typeDir == 'archive'){
    directory <- "./R_Models/games/game_1/sim_data/archive/"
  }
  directory
}

