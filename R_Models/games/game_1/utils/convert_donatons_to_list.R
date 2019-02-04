suppressMessages(library(purrr))
suppressMessages(library(dplyr))
convert_donations_to_list <- function(donations){
  aggregate_donations <- map(unique(donations$resource),function(res){
    df1         <- filter(donations,resource==res)
    agg_df1     <- df1 %>% group_by(from, to, resource) %>% 
      summarise(amount = sum(amount)) %>% ungroup()
    spr_df1     <- spread(agg_df1, key = from, value = amount)
    mat_spr_df1 <- as.matrix(spr_df1 %>% select(-to, -resource))
    rownames(mat_spr_df1) <- colnames(mat_spr_df1)
    mat_spr_df1
  })
  names(aggregate_donations) <- unique(donations$resource)
  aggregate_donations$names_order <- colnames(aggregate_donations[[1]])
  aggregate_donations
}
