suppressMessages(library(deSolve))
suppressMessages(library(tidyverse))
suppressMessages(library(jsonlite))

args <- commandArgs(trailingOnly = TRUE)
S     <- as.numeric(args[1]) # Susceptible  
I     <- as.numeric(args[2]) # Infected
R     <- as.numeric(args[3]) # Recovered
cr    <- as.numeric(args[4]) # Contact rate
ift   <- as.numeric(args[5]) # Infectivity
rd    <- as.numeric(args[6]) # Recovery delay
startArg   <- as.numeric(args[7]) # Start time
finishArg  <- as.numeric(args[8]) # Finish time

# Create the start time, finish time, and time step
START  <- startArg 
FINISH <- finishArg
STEP <- 1/4

# Create time vector
simtime <- seq(START, FINISH, by = STEP)

# Create stocks vector, with initial values
stocks  <- c(sSusceptible = S,
             sInfected = I,
             sRecovered = R)

# Create auxiliaries vector, with values
auxs    <- c(aTotal.Population = sum(stocks),
             aContact.Rate = cr,
             aInfectivity = ift,
             aRecovery.Delay = rd)

# Write callback function (model equations)
model <- function(time, stocks, auxs){
  with(as.list(c(stocks, auxs)),{
    aInfected.Contacts <- sInfected * aContact.Rate
    aSusceptible.Contact.Prob <- sSusceptible / aTotal.Population
    aBasic.Reproduction.Number <- aContact.Rate * aInfectivity * aRecovery.Delay
    aNet.Reproduction.Number <- aSusceptible.Contact.Prob * aBasic.Reproduction.Number
    aSusceptible.Contacted <- aInfected.Contacts * aSusceptible.Contact.Prob

    fIR <- aSusceptible.Contacted * aInfectivity
    fRR <- sInfected / aRecovery.Delay

    d_sSusceptible_dt  <- -fIR
    d_sInfected_dt     <- fIR - fRR
    d_sRecovered_dt    <- fRR


    return (list(c(d_sSusceptible_dt, d_sInfected_dt, d_sRecovered_dt),
                 IR = fIR, 
                 RR = fRR, 
                 basicReproductionNumber = aBasic.Reproduction.Number,
                 netReproductionNumber  = aNet.Reproduction.Number))
  })
}

# Call Solver, and store results in a data frame
o <-data.frame(ode(y = stocks, times = simtime, func = model,
                   parms = auxs, method = "euler"))

output_reduced <- o %>% select(time, sSusceptible, sInfected, sRecovered, basicReproductionNumber,
                               netReproductionNumber, IR, RR) %>% toJSON()
output_reduced
