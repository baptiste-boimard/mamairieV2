-- Revert mamairieV2_sqitch:4.Add_mairie_data_in_DB from pg

BEGIN;

DELETE FROM town_hall WHERE name = 'Mairie de Theillement';
DELETE FROM town_hall WHERE name = 'Mairie de Paris';

COMMIT;
