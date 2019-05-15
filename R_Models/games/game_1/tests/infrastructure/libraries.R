libraries <- c('deSolve', 'dplyr', 'jsonlite', 'purrr', 'lubridate', 'stringr',
              'readr', 'tidyr', 'tibble')

result <- libraries %in% rownames(installed.packages())

validation <- ifelse(is.element(FALSE, result), FALSE, TRUE)

if(validation == FALSE) {
  missingpkg <- paste(libraries[!result], collapse = ", ")
  cat('{"validation": 0, missing: ', missingpkg, '}')
}  

if(validation == TRUE) {
  cat('{"validation": 1}')
}