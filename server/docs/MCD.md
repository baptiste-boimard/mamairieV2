# SCHEMA MCD MODOCO

DEFINIR, 11 ARTICLE, 0N ARTICLE_CATEGORIE
ARTICLE: id_article, titre, description, resume, image, auteur
:
:
:
:

ARTICLE_CATEGORIE: id_categorie, nom, couleur_hex
ECRIRE, 0N ADMIN, 11 ARTICLE
ADMIN: id_admin, pseudo, password, email
POSSEDER, 11 ADMIN, 0N MAIRIE
:
:

CATEGORISER, 11 SIGNALEMENT, 0N SIGNALEMENT_CATEGORIE
SIGNALEMENT: id_signalement, titre, email, telephone, prenom, nom, description, ip, image, admin_text, admin_image
EMMETRE, 11 SIGNALEMENT, 0N MAIRIE
MAIRIE: id_mairie, nom, adresse, telephone, horaire, email, insee
RECENSER, 0N MAIRIE, 11 SERVICE
SERVICE: id_service, nom, telephone, adresse, email, image

SIGNALEMENT_CATEGORIE: id_signalement_catégorie, nom, couleur_hex
STATUER, 11 SIGNALEMENT, 0N SIGNALEMENT_STATUS
SIGNALEMENT_STATUS: id_signalement_status, nom
TRAVAILLER, 11 PERSONNEL_MAIRIE, 0N MAIRIE
PERSONNEL_MAIRIE: id_personnel_mairie, prenom, nom, role, photo
:
