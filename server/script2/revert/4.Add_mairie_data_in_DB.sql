-- Revert mamairieV2_sqitch:4.Add_mairie_data_in_DB from pg

BEGIN;

DELETE FROM mairie WHERE nom = 'Mairie de Theillement';
DELETE FROM mairie WHERE nom = 'Mairie de Paris';

COMMIT;
