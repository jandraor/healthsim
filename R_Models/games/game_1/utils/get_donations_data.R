suppressMessages(library(readr))
suppressMessages(library(dplyr))
suppressMessages(library(purrr))

get_donations_data <- function(start, stop, development = FALSE, countries = NA){
  production <- !development
  
  if(production) {
    dt <- read_csv("./R_Models/games/game_1/model/data/donations.csv", col_types = cols())
    dt <- mutate(dt,startTime = start,stopTime = stop)
  }
  
  if(development) {
    dt <- generateTestData(countries);
  }
  dt
}

generateTestData <- function(countries, start, stop) {
  generateRow <- function(countryPair, resource){
    row_df <- data.frame(from  = countryPair[[1]],
                     to = countryPair[[2]],
                     resource = resource)
  }
  
  generateResourceDF <- function(resource, countryMix){
    df <- map_df(countryMix, generateRow, resource = resource)
  }
  
  countryMix <- cross2(countries, countries)
  resources <- c('Financial', 'Vaccines', 'Antivirals', 'Ventilators')
  df <- map_df(resources, generateResourceDF, countryMix = countryMix) %>% 
    mutate(amount = 0, startTime = 0, stopTime = 5)
  print(df)
  df
}



