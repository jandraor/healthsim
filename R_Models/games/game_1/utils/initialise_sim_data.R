initialise_sim_data <- function(dirs){
  files <- list.files(dirs)
  if(length(files)==0)
    return()
  
  f <- paste0(dirs,files)
  file.remove(f)
}