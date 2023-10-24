-- Revert mamairieV2_sqitch:5.Add_data_in_DB from pg

BEGIN;

DELETE FROM reporting_status WHERE name = 'Non Validé';
DELETE FROM reporting_status WHERE name = 'En cours';
DELETE FROM reporting_status WHERE name = 'Non résolu';
DELETE FROM reporting_status WHERE name = 'Résolu';


-- DELETE FROM signalement_categorie WHERE nom = 'Autre';
-- DELETE FROM signalement_status WHERE nom = 'EN cours';

-- DELETE FROM signalement WHERE titre = 'Chien érrant';
-- DELETE FROM signalement WHERE titre = 'Panneau stop endomagée';

-- DELETE FROM personnel_mairie WHERE prenom = 'Atome';
-- DELETE FROM personnel_mairie WHERE prenom = 'Pontoizeau';
-- DELETE FROM personnel_mairie WHERE prenom = 'Boimard';



COMMIT;
