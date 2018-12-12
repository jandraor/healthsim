#=======================================================================================
# LAST script to be called
# Called when the simulation is finished. Will clear the current directory and archive results.
#=======================================================================================

source("utils/input_output.R")

new_dir <- create_dir_archive("sim_data/archive/")

move_files(new_dir=new_dir)
