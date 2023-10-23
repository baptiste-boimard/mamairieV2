-- Deploy mamairieV2_sqitch:3.Create_Index to pg

BEGIN;

CREATE INDEX signalement_index ON signalement (description, admin_text);
CREATE INDEX personnel_mairie_index ON personnel_mairie (id_personnel_mairie, prenom, nom, role, photo);

COMMIT;
