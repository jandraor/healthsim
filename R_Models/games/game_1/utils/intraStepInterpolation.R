suppressMessages(library(dplyr))
suppressMessages(library(purrr))
suppressMessages(library(zoo))

intraStepInterpolation <- function(df, step) {
  time_min <- min(df$time)
  time_max <- max(df$time)
  desired  <- seq(time_min, time_max, by = step / 2)
  actual   <- unique(df$time)
  missing  <- desired[!(desired %in% actual)]
  variables <- unique(df$ModelVariable)
  missing_df <- map_df(variables, function(variable){
    tibble(time = missing, ModelVariable = variable, Value = NA)
  })
  complete_df <- bind_rows(df, missing_df) %>% 
    arrange(ModelVariable, time) %>% 
    mutate(Value = na.locf(Value))
}