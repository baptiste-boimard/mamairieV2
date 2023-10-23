-- Verify mamairieV2_sqitch:4.Add_mairie_data_in_DB on pg

BEGIN;

SELECT * FROM mairie WHERE nom = 'Mairie de Theillement';
SELECT * FROM mairie WHERE nom = 'Mairie de Paris';

ROLLBACK;
