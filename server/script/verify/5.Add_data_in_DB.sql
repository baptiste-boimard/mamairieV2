-- Verify mamairieV2_sqitch:5.Add_data_in_DB on pg

BEGIN;

SELECT * FROM signalement_categorie WHERE nom = 'Autre';
SELECT * FROM signalement_status WHERE nom = 'EN cours';

SELECT * FROM signalement WHERE titre = 'Chien érrant';
SELECT * FROM signalement WHERE titre = 'Panneau stop endomagée';

SELECT * FROM personnel_mairie WHERE prenom = 'Atome';
SELECT * FROM personnel_mairie WHERE prenom = 'Pontoizeau';
SELECT * FROM personnel_mairie WHERE prenom = 'Boimard';


ROLLBACK;
