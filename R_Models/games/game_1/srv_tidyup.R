#=======================================================================================
# LAST script to be called
# Called when the simulation is finished. Will clear the current directory and archive results.
#=======================================================================================
source("./R_Models/games/game_1/getDirectory.R")
source("./R_Models/games/game_1/utils/create_dir_archive.R")
source("./R_Models/games/game_1/utils/moveFiles.R")
ARCHIVE_DIR <- get_Directory('archive')
new_dir <- create_dir_archive(ARCHIVE_DIR)
move_files(new_dir=new_dir)
