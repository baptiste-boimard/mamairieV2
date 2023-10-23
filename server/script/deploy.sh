export PGUSER=postgres
export PGDATABASE=mamairie
export PGPASSWORD=postgres

sqitch deploy db:pg:mamairie 1.DDL
