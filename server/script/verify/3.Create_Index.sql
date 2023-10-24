-- Verify mamairieV2_sqitch:3.Create_Index on pg

BEGIN;

SELECT * FROM pg_indexes WHERE indexname = 'reporting_index';
SELECT * FROM pg_indexes WHERE indexname = 'town_hall_staff_index';

ROLLBACK;
