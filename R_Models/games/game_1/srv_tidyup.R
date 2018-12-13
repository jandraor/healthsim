#=======================================================================================
# LAST script to be called
# Called when the simulation is finished. Will clear the current directory and archive results.
#=======================================================================================
source("srv_constants.R")
source("utils/input_output.R")

new_dir <- create_dir_archive(ARCHIVE_DIR)

move_files(new_dir=new_dir)
