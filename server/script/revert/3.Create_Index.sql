-- Revert mamairieV2_sqitch:3.Create_Index from pg

BEGIN;

DROP index reporting_index;
DROP index town_hall_staff_index;

COMMIT;
