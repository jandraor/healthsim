suppressMessages(library(purrr))
suppressMessages(library(stringr))

sanitiseCols <- function(colName) {
  if(str_detect(colName, '\\.')){
    splitName <- str_split(colName, "\\.")
    colName <- paste(splitName[[1]][2], splitName[[1]][1], sep = "_")
  }
  colName
}

sanitise_df <- function (df) {
  cols <- colnames(df)
  sanitisedCols <- map_chr(cols, sanitiseCols)                 
  colnames(df) <- sanitisedCols
  df
}