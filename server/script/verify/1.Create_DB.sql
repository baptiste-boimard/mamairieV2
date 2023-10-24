-- Verify mamairieV2_sqitch:1.Create_DB on pg

BEGIN;

SELECT * FROM pg_database WHERE datname = 'mamairieV2';

ROLLBACK;
