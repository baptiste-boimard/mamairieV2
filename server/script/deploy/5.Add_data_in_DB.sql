-- Deploy mamairieV2_sqitch:5.Add_data_in_DB to pg

BEGIN;

INSERT INTO public.reporting_status(name)
VALUES ('Non validé');

INSERT INTO public.reporting_status(name)
VALUES ('En cours');

INSERT INTO public.reporting_status(name)
VALUES ('Non résolu');

INSERT INTO public.reporting_status(name)
VALUES ('Résolu');

COMMIT;
