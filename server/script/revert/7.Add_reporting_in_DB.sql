-- Revert mamairieV2_sqitch:7.Add_reporting_in_DB from pg

BEGIN;

DELETE FROM public.reporting WHERE email = 'alain.proviste@gmail.com';
DELETE FROM public.reporting WHERE email = 'philippe.hine@gmail.com';
DELETE FROM public.reporting WHERE email = 'jean.peplus@gmail.com';
DELETE FROM public.reporting WHERE email = 'simone.doe@gmail.com';
DELETE FROM public.reporting WHERE email = 'jean.ramasse@gmail.com';
DELETE FROM public.reporting WHERE email = 'vincent.time@gmail.com';

COMMIT;
