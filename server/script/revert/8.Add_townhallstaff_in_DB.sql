-- Revert mamairieV2_sqitch:8.Add_townhallstaff_in_DB from pg

BEGIN;

DELETE FROM town_hall_staff WHERE firstname = 'Atome';
DELETE FROM town_hall_staff WHERE firstname = 'Pontoizeau';
DELETE FROM town_hall_staff WHERE firstname = 'Boimard';

COMMIT;
