-- Verify mamairieV2_sqitch:8.Add_townhallstaff_in_DB on pg

BEGIN;

SELECT * FROM town_hall_staff WHERE firstname = 'Atome';
SELECT * FROM town_hall_staff WHERE firstname = 'Pontoizeau';
SELECT * FROM town_hall_staff WHERE firstname = 'Boimard';

ROLLBACK;
