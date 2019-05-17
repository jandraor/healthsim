get_Directory <- function(typeDir) {
  sim_data_path <- "./R_Models/games/game_1/sim_data/"
  current_path <- paste0(sim_data_path, "current/")
  archive_path <- paste0(sim_data_path, "archive/")
  
  if(!dir.exists(current_path)){
    dir.create(current_path, recursive = T)
  }
  
  if(!dir.exists(archive_path)){
    dir.create(archive_path, recursive = T)
  }
  
  if (typeDir == 'current'){
    directory <- "./R_Models/games/game_1/sim_data/current/"
  }
  if(typeDir == 'archive'){
    directory <- "./R_Models/games/game_1/sim_data/archive/"
  }
  directory
}

