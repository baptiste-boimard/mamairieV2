-- Revert mamairieV2_sqitch:6.Add_reporting_category_in_DB from pg

BEGIN;

DELETE FROM public.reporting_category WHERE name = 'Voirie';
DELETE FROM public.reporting_category WHERE name = 'Eclairage';
DELETE FROM public.reporting_category WHERE name = 'Voisinage';
DELETE FROM public.reporting_category WHERE name = 'Ramassage des déchets';
DELETE FROM public.reporting_category WHERE name = 'Objet trouvé ou perdu';
DELETE FROM public.reporting_category WHERE name = 'Autre';

COMMIT;
