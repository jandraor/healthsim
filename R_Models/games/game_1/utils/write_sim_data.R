library(stringr)
library(lubridate)
source('./R_Models/games/game_1/utils/fixed_number.R')
write_sim_data <- function(sim_data, dirs){
  f <- list.files(dirs)
  fname <- paste(fixed_number(length(f)+1),"SIM_DATA",
                 str_replace_all(str_replace_all(str_replace_all(now()," ","_"),"-","_"),":","_"),sep="_")
  saveRDS(sim_data, paste0(dirs,fname))
}