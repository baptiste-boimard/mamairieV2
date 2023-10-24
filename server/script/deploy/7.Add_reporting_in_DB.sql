-- Deploy mamairieV2_sqitch:7.Add_reporting_in_DB to pg

BEGIN;

INSERT INTO "reporting" ("title","email","phonenumber","firstname","lastname","description", "ip", "reporting_category_id", "reporting_status_id", "town_hall_id")
VALUES('Chien érrant','alain.proviste@gmail.com','0688789531','Alain','Proviste','Bonjour, J''ai vu un chien érrant 6 rue du champ des loups, il etait noir avec des tâches blanches de taille moyenne et un petit museau.', '192.168.0.56', 6, 1, 1);

INSERT INTO "reporting" ("title","email","phonenumber","firstname","lastname","description", "ip", "reporting_category_id", "reporting_status_id", "town_hall_id")
VALUES('Panneau stop endomagé','philippe.hine@gmail.com','0765963665','Philippe','Hine','Bonjour, je me permets de vous signaler que le panneau STOP au de la rue Jules Verne est tombé.', '192.56.45.245', 1, 2, 1);

INSERT INTO "reporting" ("title","email","phonenumber","firstname","lastname","description", "ip", "reporting_category_id", "reporting_status_id", "town_hall_id")
VALUES('Lumière cassée','jean.peplus@gmail.com','0614569874','Jean','Peplus','Bonjour, la lumière de la rue est cassée', '51.75.166.12', 2, 3, 1);

INSERT INTO "reporting" ("title","email","phonenumber","firstname","lastname","description", "ip", "reporting_category_id", "reporting_status_id", "town_hall_id")
VALUES('Mes voisins sont bruyants','simone.doe@gmail.com','0645982563','Simone','Doe','Mes voisins font la fête jusqu''au petit matin tous les week end', '25.65.78.123', 3, 4, 1);

INSERT INTO "reporting" ("title","email","phonenumber","firstname","lastname","description", "ip", "reporting_category_id", "reporting_status_id", "town_hall_id")
VALUES('Les poubelles trainent','jean.ramasse@gmail.com','0645789865','Jean','Ramasse','Le service de ramassage des déchets sont encore en grève', '45.65.123.145', 4, 4, 1);

INSERT INTO "reporting" ("title","email","phonenumber","firstname","lastname","description", "ip", "reporting_category_id", "reporting_status_id", "town_hall_id")
VALUES('J''ai perdu mes clés','vincent.time@gmail.com','0632497156','Vincent','Time','Dans la grande rue, elles sont sur un porte clés décapsuleur', '145.55.13.15', 5, 4, 1);

COMMIT;
