suppressMessages(library(deSolve))
suppressMessages(library(tidyverse))
suppressMessages(library(jsonlite))

args <- commandArgs(trailingOnly=TRUE)
gr   <- as.numeric(args[1])

START <- 0
FINISH <- 100
STEP <-0.25

simtime <- seq(START, FINISH, by = STEP)

stocks <- c(sStock = 100)

auxs <- c(aCapacity = 10000,
          aRef.Availability = 1,
          aRef.GrowthRate = gr)

model <- function(time, stocks, aux){
  with(as.list(c(stocks, auxs)),{
    aAvailability <- 1 - sStock / aCapacity
    aEffect       <- aAvailability / aRef.Availability
    aGrowth.Rate <- aRef.GrowthRate * aEffect
    fNet.Flow <- sStock * aGrowth.Rate
    dS_dt <- fNet.Flow
    return(list(c(dS_dt), NetFlow = fNet.Flow, GrowthRate = aGrowth.Rate,
                Effect = aEffect, Availability = aAvailability))
  })
}

o <- data.frame(ode(y = stocks, times = simtime, func = model,
                    parms = auxs, method = "euler"))

output_reduced <-o %>% select(time, sStock) %>% toJSON()
output_reduced
