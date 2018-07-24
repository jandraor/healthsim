suppressMessages(library(deSolve))
suppressMessages(library(tidyverse))
suppressMessages(library(jsonlite))

args <- commandArgs(trailingOnly = TRUE)
I   <- as.numeric(args[1]) # Infected
cr  <- as.numeric(args[2]) # Contact rate
i   <- as.numeric(args[3]) # Infectivity
rd  <- as.numeric(args[4]) # Recovery delay

# Create the start time, finish time, and time step
START <- 0
FINISH <- 20
STEP <- 1/4

# Create time vector
simtime <- seq(START, FINISH, by = STEP)

# Create stocks vector, with initial values
stocks  <- c(sSusceptible = 10000 - I,
             sInfected = I,
             sRecovered = 0)

# Create auxiliaries vector, with values
auxs    <- c(aTotal.Population = 10000,
             aContact.Rate = cr,
             aInfectivity = i,
             aRecovery.Delay = rd)

# Write callback function (model equations)
model <- function(time, stocks, auxs){
  with(as.list(c(stocks, auxs)),{
    aInfected.Contacts <- sInfected * aContact.Rate
    aSusceptible.Contact.Prob <- sSusceptible / aTotal.Population
    aSusceptible.Contacted <- aInfected.Contacts * aSusceptible.Contact.Prob

    fIR <- aSusceptible.Contacted * aInfectivity
    fRR <- sInfected / aRecovery.Delay

    d_sSusceptible_dt  <- -fIR
    d_sInfected_dt     <- fIR - fRR
    d_sRecovered_dt    <- fRR


    return (list(c(d_sSusceptible_dt, d_sInfected_dt, d_sRecovered_dt),
                 IR = fIR, RR = fRR))
  })
}

# Call Solver, and store results in a data frame
o <-data.frame(ode(y=stocks, times=simtime, func = model,
                   parms=auxs, method="euler"))

output_reduced <- o %>% select(time, sSusceptible, sInfected, sRecovered) %>% toJSON()
output_reduced
