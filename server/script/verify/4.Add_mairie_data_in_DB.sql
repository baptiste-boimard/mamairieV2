-- Verify matown_hallV2_sqitch:4.Add_town_hall_data_in_DB on pg

BEGIN;

SELECT * FROM town_hall WHERE name = 'Mairie de Theillement';
SELECT * FROM town_hall WHERE name = 'Mairie de Paris';

ROLLBACK;
