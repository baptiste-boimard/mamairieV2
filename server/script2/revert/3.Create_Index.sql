-- Revert mamairieV2_sqitch:3.Create_Index from pg

BEGIN;

DROP index signalement_index;
DROP index personnel_mairie_index;

COMMIT;
