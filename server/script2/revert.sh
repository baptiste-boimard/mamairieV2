export PGUSER=mamairieV2
export PGDATABASE=mamairieV2
export PGPASSWORD=mamairieV2

# sqitch revert db:pg:mamairieV2 1.Create_DB
# sqitch revert db:pg:mamairieV2 2.Create_Tables
sqitch revert db:pg:mamairieV2 3.Create_Index
# sqitch revert db:pg:mamairieV2 4.Add_mairie_data_in_DB