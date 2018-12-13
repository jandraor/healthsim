#=======================================================================================
# FIRST script to be called
# Script to initialise the simulation
#=======================================================================================
source("srv_constants.R")
source("model/DataF.R")
source("model/BuildModelF.R")
source("model/ModelAPI.R")
source("model/SIRModelF.R")
source("utils/input_output.R")

g_auxs            <- c(VirusSeverityProportion=0.0,
                       Infected1_MULT=1.0,
                       Infected2_MULT=1.0,
                       InfectedAV_MULT=0.0,
                       InfectedQ_MULT=0.0,
                       InfectedS_MULT=1.0)

# With SAMPLE=F, all of the countries are initialised.

initialise_sim_data(CURRENT_DIR)

sim_data <- initialise(g_auxs)

sim_data$g_final_stocks <- sim_data$g_stocks

write_sim_data(sim_data, "sim_data/current/")

