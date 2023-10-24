-- Deploy mamairieV2_sqitch:6.Add_reporting_category_in_DB to pg

BEGIN;

INSERT INTO public.reporting_category(name)
VALUES ('Voirie');

INSERT INTO public.reporting_category(name)
VALUES ('Eclairage');

INSERT INTO public.reporting_category(name)
VALUES ('Voisinage');

INSERT INTO public.reporting_category(name)
VALUES ('Ramassage des déchets');

INSERT INTO public.reporting_category(name)
VALUES ('Objet trouvé ou perdu');

INSERT INTO public.reporting_category(name)
VALUES ('Autre');

COMMIT;
