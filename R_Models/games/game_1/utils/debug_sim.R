# This file will reload all of the simulation RDS files in a given directory

source("utils/input_output.R")

dirs <- "sim_data/current/"

all <- load_all_data(dirs)