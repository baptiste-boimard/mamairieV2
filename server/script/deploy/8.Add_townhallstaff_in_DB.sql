-- Deploy mamairieV2_sqitch:8.Add_townhallstaff_in_DB to pg

BEGIN;

INSERT INTO "town_hall_staff"("firstname","lastname","role","photo","town_hall_id")
VALUES('Atome','Aleks','Maire','https://ca.slack-edge.com/T02MBC4J9K5-U02M8CJUVJR-2df2ffa3c507-512',1);

INSERT INTO "town_hall_staff"("firstname","lastname","role","photo","town_hall_id")
VALUES('Pontoizeau','Benjamin','Front end lead Dev','https://ca.slack-edge.com/T02MBC4J9K5-U02N8JLBYPM-7637a7c0011b-512',1);

INSERT INTO "town_hall_staff"("firstname","lastname","role","photo","town_hall_id")
VALUES('Boimard','Baptiste','Front end Scrum master','https://ca.slack-edge.com/T02MBC4J9K5-U02NL5RKN81-d8d9a4d0ab68-72',1);

COMMIT;
