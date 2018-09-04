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
startArg <- as.numeric(args[7]) # Start time
finishArg <- as.numeric(args[8]) # Finish time

# Create the start time, finish time, and time step
START  <- startArg - startArg 
FINISH <- finishArg - startArg
STEP <- 1/32

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

R1_identifier.prv <- Inf
B1_identifier.prv <- Inf
B2_identifier.prv <- Inf

# Write callback function (model equations)
model <- function(time, stocks, auxs){
  with(as.list(c(stocks, auxs)),{
    aContactsperInfected <- sInfected * aContact.Rate
    aEffectiveContactsPerInfected <- aContactsperInfected * aInfectivity
    aSusceptible.Contact.Prob <- sSusceptible / aTotal.Population
    aBasic.Reproduction.Number <- aContact.Rate * aInfectivity * aRecovery.Delay
    aNet.Reproduction.Number <- aSusceptible.Contact.Prob * aBasic.Reproduction.Number
    
    fIR <- aEffectiveContactsPerInfected * aSusceptible.Contact.Prob
    fRR <- sInfected / aRecovery.Delay
    
    d_sSusceptible_dt  <- -fIR
    d_sInfected_dt     <- fIR - fRR
    d_sRecovered_dt    <- fRR
    
    ###########################################################################
    # Loop Impact Method
    ###########################################################################
    # loop identifiers
    B1_identifier <- aSusceptible.Contact.Prob
    B2_identifier <- sInfected / aRecovery.Delay
    R1_identifier <- aEffectiveContactsPerInfected
    # Impacts on stocks
    impB1_sSusceptible <- - (((B1_identifier - B1_identifier.prv) / STEP) * R1_identifier) / d_sSusceptible_dt
    impR1_sSusceptible <- - (((R1_identifier - R1_identifier.prv) / STEP) * B1_identifier) / d_sSusceptible_dt
    impB1_sInfected <- (((B1_identifier - B1_identifier) / STEP) * R1_identifier) / d_sInfected_dt
    impR1_sInfected <- (((R1_identifier - R1_identifier.prv) / STEP) * B1_identifier) / d_sInfected_dt
    impB2_sInfected <- ((B2_identifier - B2_identifier.prv) / STEP) / d_sInfected_dt
    impB2_sRecovered <- ((B2_identifier - B2_identifier.prv) / STEP) / d_sRecovered_dt
    
    # Loop dominance
    # On susceptible
    dl_sSusceptible <- NA
     
    if(time > 0){
      if(impR1_sSusceptible > impB1_sSusceptible) {
        dl_sSusceptible <- 3
      }
      if(impB1_sSusceptible > impR1_sSusceptible) {
        dl_sSusceptible <- 1
      }
    }
    # On infected
    dl_sInfected <- NA
    
    if(time > 0) {
      R_impacts <- c('3' = impR1_sInfected)
      B_impacts <- sort(c('1' = impB1_sInfected, '2' = impB2_sInfected))
      R_sum <- abs(sum(R_impacts))
      B_sum <- abs(sum(B_impacts))
      
      if(R_sum > B_sum) {
        dl_sInfected <- 3
      }
      
      if(B_sum > R_sum) {
        if(abs(B_impacts[1]) > R_sum) {
          dl_sInfected <- as.numeric(names(B_impacts[1]))
        } else {
          dl_sInfected <- 4
        }
      }
    }
    
    # On recovered
    if(time == 0){
      dl_sRecovered <- NA
    } else {
      dl_sRecovered <- 2
    }
    
    # Set values for next step
    B1_identifier.prv <<- B1_identifier
    B2_identifier.prv <<- B2_identifier
    R1_identifier.prv <<- R1_identifier
    
    return (list(c(d_sSusceptible_dt, d_sInfected_dt, d_sRecovered_dt),
                 IR = fIR, 
                 RR = fRR, 
                 basicReproductionNumber = aBasic.Reproduction.Number,
                 netReproductionNumber  = aNet.Reproduction.Number,
                 dl_sSusceptible = dl_sSusceptible,
                 dl_sInfected = dl_sInfected,
                 dl_sRecovered = dl_sRecovered
                 ))
  })
}

# Call Solver, and store results in a data frame
o <-data.frame(ode(y = stocks, times = simtime, func = model,
                   parms = auxs, method = "euler"))

output <- o %>% mutate(time = time + startArg) %>% toJSON()
output