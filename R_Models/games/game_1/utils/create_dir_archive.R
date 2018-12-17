library(lubridate)
library(stringr)
source('./R_Models/games/game_1/utils/fixed_number.R')
create_dir_archive <- function(root_dir=ARCHIVE_DIR){
  f <- list.files(root_dir)
  fname <- paste(fixed_number(length(f)+1),"HealthSIM",
                 str_replace_all(str_replace_all(str_replace_all(now()," ","_"),"-","_"),":","_"),sep="_")
  newdir <- paste0(root_dir,fname)
  dir.create(newdir)
  paste0(newdir,"/")
}