move_files <- function(old_dir, new_dir){
  f_rel <- list.files(old_dir)
  f_abs <- paste0(old_dir,list.files(old_dir))
  new_f <- paste0(new_dir,f_rel)
  file.rename(f_abs,new_f)
}