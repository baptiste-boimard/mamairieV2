-- Revert mamairieV2_sqitch:2.Create_Tables from pg

BEGIN;

DROP TABLE IF EXISTS mairie, admin, article, service, personnel_mairie, article_categorie, signalement_status, signalement_categorie, signalement CASCADE;

COMMIT;
