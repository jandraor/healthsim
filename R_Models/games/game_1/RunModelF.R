source("ModelV1.1/DataF.R")
source("ModelV1.1/BuildModelF.R")
source("ModelV1.1/ModelAPI.R")
source("ModelV1.1/SIRModelF.R")


g_auxs            <- c(VirusSeverityProportion=0.0,
                       Infected1_MULT=1.0,
                       Infected2_MULT=1.0,
                       InfectedAV_MULT=0.0,
                       InfectedQ_MULT=0.0,
                       InfectedS_MULT=1.0)

# With SAMPLE=F, all of the countries are initialised.
sim_data <- initialise(SAMPLE=F)

# sim_data also contains g_policy_matrix, and this can be updated before a call.
sim_data <- run_simulation(g_auxs, sim_data, START = 2, FINISH = 10, STEP = 0.125)





