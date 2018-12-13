# This file will reload all of the simulation RDS files in a given directory

source("utils/input_output.R")

dirs <- CURRENT_DIR

all <- load_all_data(dirs)