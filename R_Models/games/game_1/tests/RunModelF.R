source("model/DataF.R")
source("model/BuildModelF.R")
source("model/ModelAPI.R")
source("model/SIRModelF.R")


g_auxs            <- c(VirusSeverityProportion=0.0,
                       Infected1_MULT=1.0,
                       Infected2_MULT=1.0,
                       InfectedAV_MULT=0.0,
                       InfectedQ_MULT=0.0,
                       InfectedS_MULT=1.0)

sim_data <- initialise(g_auxs)

# sim_data also contains g_policy_matrix, and this can be updated before a call.
sim_data <- run_simulation(sim_data, START = 0, FINISH = 5, STEP = 0.125)





