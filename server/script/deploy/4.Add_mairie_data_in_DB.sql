-- Deploy mamairieV2_sqitch:4.Add_mairie_data_in_DB to pg

BEGIN;

INSERT INTO town_hall ("name","address","phonenumber","hourly","email","insee")
VALUES('Mairie de Theillement', '23 route de Bourgtheroulde', '0235984578', 'Lundi : de 11h a 12h30  Le Jeudi : de 08h:30 à 11h00 Le Vendredi : de 16h30 à 18h00', 'mairie.theillement@gmail.com', '023456');

INSERT INTO town_hall ("name","address","phonenumber","hourly","email","insee")
VALUES('Mairie de Paris', 'Hôtel de ville de Paris', '0156874523', 'Tous les jours de 9h a 18h', 'contact@villedeparis.fr', '012654');

COMMIT;
