source("./R_Models/games/game_1/getDirectory.R")
source("./R_Models/games/game_1/utils/read_sim_data.R")
source("./R_Models/games/game_1/utils/write_sim_data.R")
source("./R_Models/games/game_1/utils/get_policy_matrix.R")
source("./R_Models/games/game_1/model/API/runSimulation.R")
source("./R_Models/games/game_1/utils/initialise_sim_data.R")
source("./R_Models/games/game_1/utils/write_sim_data.R")
source("./R_Models/games/game_1/model/API/initialise.R")
source("./R_Models/games/game_1/getDirectory.R")

g_auxs            <- c(VirusSeverityProportion=0.0,
                       Infected1_MULT=1.0,
                       Infected2_MULT=1.0,
                       InfectedAV_MULT=0.0,
                       InfectedQ_MULT=0.0,
                       InfectedS_MULT=1.0)

# With SAMPLE=F, all of the countries are initialised.
CURRENT_DIR <- get_Directory('current')

initialise_sim_data(CURRENT_DIR)

sim_data <- initialise(g_auxs,ALPHA = 10)

sim_data$g_final_stocks <- sim_data$g_stocks

write_sim_data(sim_data, CURRENT_DIR)

start_time <- 0; finish_time <- 5
CURRENT_DIR <- get_Directory('current')
sim_data <- read_sim_data(CURRENT_DIR)

# get the final stocks from the previous simulation
sim_data$g_stocks <- sim_data$g_final_stocks

# would also need to set the policy matrix here based on further command line inputs
# sim_data$g_policy_matrix <- sim_data$g_policy_matrix

# load the policy matrix from PolicyMatrix.csv
sim_data$g_policy_matrix <- get_policy_matrix(rownames(sim_data$g_policy_matrix))

sim_data <- run_simulation(sim_data, START = start_time, FINISH = finish_time, STEP = 0.05)
write_sim_data(sim_data, CURRENT_DIR)


# Plot the data
library(tidyr)
library(ggplot2)
# Display epi-curves
df <- select(sim_data$sim_output,time,starts_with("TotalInfected."))
tdf <- gather(df,key = Country, value = Infected, 2:ncol(df))
ggplot(data=tdf,aes(x=time,y=Infected,colour=Country))+geom_path()
# Display Total population
df <- select(sim_data$sim_output,time,starts_with("TotalPopulation."))
tdf <- gather(df,key = Country, value = Infected, 2:ncol(df))
ggplot(data=tdf,aes(x=time,y=Infected,colour=Country))+geom_path()

ARCHIVE_DIR <- get_Directory('archive')
new_dir <- create_dir_archive(ARCHIVE_DIR)
move_files(new_dir=new_dir)

