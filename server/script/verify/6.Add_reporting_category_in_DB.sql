-- Verify mamairieV2_sqitch:6.Add_reporting_category_in_DB on pg

BEGIN;

SELECT * FROM public.reporting_category WHERE name = 'Voirie';
SELECT * FROM public.reporting_category WHERE name = 'Eclairage';
SELECT * FROM public.reporting_category WHERE name = 'Voisinage';
SELECT * FROM public.reporting_category WHERE name = 'Ramassage des déchets';
SELECT * FROM public.reporting_category WHERE name = 'Objet trouvé ou perdu';
SELECT * FROM public.reporting_category WHERE name = 'Autre';

ROLLBACK;
