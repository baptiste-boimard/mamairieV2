-- Verify mamairieV2_sqitch:2.Create_Tables on pg

BEGIN;

SELECT "id_mairie", "nom", "adresse", "telephone", "horaire", "email", "insee", "created_at", "updated_at" FROM mairie;
SELECT "id_admin", "pseudo", "password", "email", "mairie_id", "created_at", "updated_at" FROM admin;
SELECT "id_article", "titre", "description", "resume", "image", "auteur", "admin_id", "created_at", "updated_at" FROM article;
SELECT "id_service", "nom", "telephone", "adresse", "email", "image", "mairie_id", "created_at", "updated_at" FROM service;
SELECT "id_personnel_mairie", "prenom", "nom", "role", "photo", "mairie_id", "created_at", "updated_at" FROM personnel_mairie;
SELECT "id_article_categorie", "nom", "couleur_hex", "created_at", "updated_at" FROM article_categorie;
SELECT "id_signalement_status", "nom", "created_at", "updated_at" FROM signalement_status;
SELECT "id_signalement_categorie", "nom", "couleur_hex", "created_at", "updated_at" FROM signalement_categorie;
SELECT "id_signalement", "titre", "email", "telephone", "prenom", "nom", "description", "ip", "image", "admin_text", "admin_image", "signalement_categorie_id", "signalement_status_id", "mairie_id", "created_at", "updated_at" FROM signalement;

ROLLBACK;
