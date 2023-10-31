-- Deploy mamairieV2_sqitch:3.Create_Index to pg

BEGIN;

CREATE INDEX reporting_index ON reporting (description, admin_text);
CREATE INDEX town_hall_staff_index ON town_hall_staff (town_hall_staff_id, firstname, lastname, role, photo);

COMMIT;