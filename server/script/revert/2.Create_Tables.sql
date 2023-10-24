-- Revert mamairieV2_sqitch:2.Create_Tables from pg

BEGIN;

DROP TABLE IF EXISTS town_hall, admin, article, service, town_hall_staff, article_category, reporting_status, reporting_category, reporting CASCADE;

COMMIT;
