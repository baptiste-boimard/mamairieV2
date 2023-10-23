-- Verify mamairieV2_sqitch:3.Create_Index on pg

BEGIN;

SELECT * FROM pg_indexes WHERE indexname = 'signalement_index';
SELECT * FROM pg_indexes WHERE indexname = 'personnel_mairie_index';

ROLLBACK;
