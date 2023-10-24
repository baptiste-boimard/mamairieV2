-- Verify mamairieV2_sqitch:7.Add_reporting_in_DB on pg

BEGIN;

SELECT * FROM public.reporting WHERE email = 'alain.proviste@gmail.com';
SELECT * FROM public.reporting WHERE email = 'philippe.hine@gmail.com';
SELECT * FROM public.reporting WHERE email = 'jean.peplus@gmail.com';
SELECT * FROM public.reporting WHERE email = 'simone.doe@gmail.com';
SELECT * FROM public.reporting WHERE email = 'jean.ramasse@gmail.com';
SELECT * FROM public.reporting WHERE email = 'vincent.time@gmail.com';

ROLLBACK;
