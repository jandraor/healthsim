# These are utilities for managing the simulation data on the disk
library(lubridate)
library(stringr)
library(purrr)

# #-------------------------------------------------------------
# create_dir_archive <- function(root_dir=ARCHIVE_DIR){
#   f <- list.files(root_dir)
#   fname <- paste(fixed_number(length(f)+1),"HealthSIM",
#                  str_replace_all(str_replace_all(str_replace_all(now()," ","_"),"-","_"),":","_"),sep="_")
#   newdir <- paste0(root_dir,fname)
#   dir.create(newdir)
#   paste0(newdir,"/")
# }

#-------------------------------------------------------------
# move_files <- function(old_dir=CURRENT_DIR, 
#                        new_dir){
#   f_rel <- list.files(old_dir)
#   f_abs <- paste0(old_dir,list.files(old_dir))
#   new_f <- paste0(new_dir,f_rel)
#   file.rename(f_abs,new_f)
# }

#-------------------------------------------------------------
# initialise_sim_data <- function(dirs){
#   files <- list.files(dirs)
#   if(length(files)==0)
#     return()
#   
#   f <- paste0(dirs,files)
#   file.remove(f)
# }

# #-------------------------------------------------------------
# fixed_number <- function(n){
#   formatC(n, width = 3, flag = '0')
# }

#-------------------------------------------------------------
# write_sim_data <- function(sim_data, dirs){
#   f <- list.files(dirs)
#   fname <- paste(fixed_number(length(f)+1),"SIM_DATA",
#             str_replace_all(str_replace_all(str_replace_all(now()," ","_"),"-","_"),":","_"),sep="_")
#   saveRDS(sim_data, paste0(dirs,fname))
# }
# 
# #-------------------------------------------------------------
# read_sim_data <- function(dirs){
#   f <- list.files(dirs)
#   if(length(f)==0)
#     stop("Error, no simulation files in directory")
#   readRDS(paste0(dirs,f[length(f)]))
# }

#-------------------------------------------------------------
load_all_data <- function(dirs){
  files <- list.files(dirs)
  if(length(files)==0)
    return()
  map(seq_along(files), function(index)readRDS(paste0(dirs,files[index])))
}

