export PGUSER=mamairieV2
export PGDATABASE=mamairieV2
export PGPASSWORD=mamairieV2

# sqitch deploy db:pg:mamairieV2 2.Create_Tables
# sqitch deploy db:pg:mamairieV2 3.Create_Index
# sqitch deploy db:pg:mamairieV2 4.Add_mairie_data_in_DB
sqitch deploy db:pg:mamairieV2 5.Add_data_in_DB