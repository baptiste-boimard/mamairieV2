-- Deploy mamairieV2_sqitch:5.Add_data_in_DB to pg

BEGIN;

-- INSERT INTO public.signalement_status(nom)
-- VALUES ('Non validé');

-- INSERT INTO public.signalement_status(nom)
-- VALUES ('En cours');

-- INSERT INTO public.signalement_status(nom)
-- VALUES ('Non résolu');

-- INSERT INTO public.signalement_status(nom)
-- VALUES ('Résolu');

INSERT INTO "signalement_categorie" ("nom", "couleur_hex")
VALUES('Autre', '#FF0000');

INSERT INTO "signalement" ("titre","email","telephone","prenom","nom","description", "ip", "signalement_categorie_id", "signalement_status_id", "mairie_id")
VALUES('Chien érrant','alain.proviste.@gmail.com','0688789531','Alain','Proviste','Bonjour, J''ai vu un chien errant 6 rue du champ des loups, il etais noir avec des tache blanche de taille moyenne avec un petit museaux.', '192.168.0.56', 4, 1, 6);

INSERT INTO "signalement" ("titre","email","telephone","prenom","nom","description", "ip", "signalement_categorie_id", "signalement_status_id", "mairie_id")
VALUES('Panneau stop endomagée','philippe.hine@gmail.com','0765963665','Philippe','Hine','Bonjour, je me permet de vous signalez que le panneau STOP au 7 rue Jean Castex à étais taguer avec un gros "49.3".', '192.56.45.245', 4, 2, 6);

INSERT INTO "signalement" ("titre","email","telephone","prenom","nom","description", "ip", "signalement_categorie_id", "signalement_status_id", "mairie_id")
VALUES('Lumière cassée','jean.peplus.@gmail.com','0614569874','Jean','Peplus','Bonjour, la lumière de la rue est cassée', '51.75.166.12', 4, 3, 6);

INSERT INTO "signalement" ("titre","email","telephone","prenom","nom","description", "ip", "signalement_categorie_id", "signalement_status_id", "mairie_id")
VALUES('Arbre malade','Simone.doe.@gmail.com','0645982563','Simone','Doe','L''arbre devant chez moi est malade', '25.65.78.123', 4, 4, 6);


INSERT INTO "personnel_mairie"("prenom","nom","role","photo","mairie_id")
VALUES('Atome','Aleks','Maire','https://ca.slack-edge.com/T02MBC4J9K5-U02M8CJUVJR-2df2ffa3c507-512',6);

INSERT INTO "personnel_mairie"("prenom","nom","role","photo","mairie_id")
VALUES('Pontoizeau','Benjamin','Front end lead Dev','https://ca.slack-edge.com/T02MBC4J9K5-U02N8JLBYPM-7637a7c0011b-512',6);

INSERT INTO "personnel_mairie"("prenom","nom","role","photo","mairie_id")
VALUES('Boimard','Baptiste','Front end Scrum master','https://ca.slack-edge.com/T02MBC4J9K5-U02NL5RKN81-d8d9a4d0ab68-72',6);

COMMIT;
