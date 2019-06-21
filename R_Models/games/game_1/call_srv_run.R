#=======================================================================================
# Script to run a simulation. Initially should be called as
# Rscript srv_run.R <START_TIME> <FINISH_TIME>
#=======================================================================================
source("./R_Models/games/game_1/lib/srv_run.R")

cmd_args <- commandArgs(TRUE)

start_time    <- as.numeric(cmd_args[1])  # 1st parameter from command line
finish_time   <- as.numeric(cmd_args[2])  # 2nd parameter from command line
step          <- as.numeric(cmd_args[3])  # 2nd parameter from command line

if(is.na(start_time)) {
  start_time <- 0
}

if(is.na(finish_time)) {
  finish_time <- 1
}

if(is.na(step)) {
  step <- 1 / 4
}

srv_run(start_time, finish_time, step)
