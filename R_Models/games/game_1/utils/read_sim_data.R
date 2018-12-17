read_sim_data <- function(dirs){
  f <- list.files(dirs)
  if(length(f)==0)
    stop("Error, no simulation files in directory")
  readRDS(paste0(dirs,f[length(f)]))
}