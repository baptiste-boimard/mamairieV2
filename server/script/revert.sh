export PGUSER=mamairieV2
export PGDATABASE=mamairieV2
export PGPASSWORD=mamairieV2

# sqitch revert db:pg:mamairieV2 1.Create_DB
# sqitch revert db:pg:mamairieV2 2.Create_Tables
# sqitch revert db:pg:mamairieV2 3.Create_Index
sqitch revert db:pg:mamairieV2 4.Add_mairie_data_in_DB
sqitch revert db:pg:mamairieV2 5.Add_data_in_DB
sqitch revert db:pg:mamairieV2 6.Add_reporting_category_in_DB
sqitch revert db:pg:mamairieV2 7.Add_reporting_in_DB
sqitch revert db:pg:mamairieV2 8.Add_townhallstaff_in_DB