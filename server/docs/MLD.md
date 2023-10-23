# MLD 

ARTICLE(id_article, titre, description, resume, image, auteur, admin_id, article_categorie_id)

ARTICLE_CATEGORIE(id_article_categorie, nom, couleur_hex)

ADMIN(id_admin, pseudo, password, email, mairie_id)

MAIRIE(id_mairie, nom, adresse, telephone, horaire, email, insee)

PERSONNEL_MAIRIE(id_personnel_mairie, prenom, nom, role, photo, id_mairie)

SERVICE(id_service, nom, telephone, adresse, email, image, mairie_id)

SIGNALEMENT(id_signalement, titre, email, telephone, prenom, nom, description, ip, image, admin_text, admin_image, id_signalement_categorie, id_signalement_status, id_mairie)

SIGNALEMENT_STATUS(id_signalement_status, nom)

SIGNALEMENT_CATEGORIE(id_signalement_catégorie, nom, couleur_hex)