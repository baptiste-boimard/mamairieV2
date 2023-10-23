# Dictionnaire des données

## Table ADMIN

| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| id_admin| INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | Identifiant |
| pseudo | CHAR(20) | NOT NULL | Ppseudo utilisateur admin |
| password | TEXT | NOT NULL | Password de l'utilisateur admin |
| email | TEXT | NOT NULL UNIQUE| Email de l'utilisateur admin |
| mairie_id | INT | REFERENCES mairie(id_mairie) | Idendifiant de la mairie |
| created_at | TIMESTAMPTZ | DEFAULT NOW()| Création date |
| updated_at | TIMESTAMPTZ | | Mise à jour date|

## Table SIGNALEMENT

| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| id_signalement | INT |GENERATED ALWAYS AS IDENTITY PRIMARY KEY| Idendifiant |
| titre | VARCHAR(50) | NOT NULL | Titre du signalement |
| email | TEXT | NOT NULL | Email du visiteur |
| telephone | CHAR(10) | NOT NULL | Téléphone du visiteur |
| prenom | TEXT | NOT NULL | Prénom du visiteur |
| nom | TEXT | NOT NULL | Nom du visiteur |
| description | TEXT |NOT NULL | Description du signalement par le visiteur |
| ip | TEXT | NOT NULL | Adresse IP du visiteur |
| image | TEXT | | Adresse de stockage de l'image ajoutée par le visiteur |
| admin_text | TEXT | | Réponse de l'admin |
| admin_image | TEXT | | Adresse de stockage de l'image ajoutée par l'admin |
| signalement_categorie_id | TEXT | REFERENCES signalement_categorie(id_signalement_categorie) | Idendifiant de la catégorie du signalement |
| signalement_statut_id | TEXT | REFERENCES signalement_status(id_signalement_status) | Idendifiant du status du signalement |
| mairie_id | INT | REFERENCES mairie(id_mairie) | Idendifiant de la mairie |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Création date |
| updated_at | TIMESTAMPTZ | | Mise à jour date |



## Table ARTICLE

| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| id_article | INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | Idendifiant |
| titre | VARCHAR(40) | NOT NULL | Titre de l'article |
| description | TEXT | NOT NULL | Texte de l'article |
| resume | TEXT | | Résumé de l'article |
| image | TEXT | | Adresse de l'image de l'article |
| auteur | TEXT | NOT NULL | Auteur de l'article |
| admin_id | INT | | REFERENCES admin(id_admin) | Idendifiant de la mairie |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Création date |
| updated_at | TIMESTAMPTZ | | Mise à jour date |


## Table SERVICE

| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| id_service | INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | Idendifiant |
| nom | TEXT | NOT NULL | Nom du service |
| telephone | CHAR(10) | NOT NULL | Téléphone du service |
| adresse | TEXT | NOT NULL | Adresse du service |
| email | TEXT | NOT NULL | Email du service |
| image | TEXT | | Adresse de l'image de la photo du service |
| mairie_id | INT | REFERENCES mairie(id_mairie) | Idendifiant de la mairie |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Création date |
| updated_at | TIMESTAMPTZ | | Mise à jour date |


## Table MAIRIE
| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
|id_mairie | INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | Identifiant |
| nom | TEXT | NOT NULL UNIQUE | nom de la mairie |
| adresse | TEXT | NOT NULL | Adresse de la mairie |
| telephone | CHAR(10) | |Téléphone de la mairie |
| horaire | TEXT | | Horaires de la mairie |
| email | TEXT | | Email de la mairie |
| insee | TEXT | NOT NULL UNIQUE | Numéros insee de la mairie |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Création date |
| updated_at | TIMESTAMPTZ | | Mise à jour date |

## Table PERSONNEL_MAIRIE
| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| id_personnel_mairie | INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | Identifiant |
| prenom | TEXT | NOT NULL | Prénom de la personne |
| nom | TEXT | NOT NULL | Nom de la personne |
| role | TEXT | NOT NULL | Fonction de la personne |
| photo | TEXT | | Adresse de la photo de la personne |
| mairie_id | INT | REFERENCES mairie(mairie_id) | Idendifiant de la mairie |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Création date |
| updated_at | TIMESTAMPTZ | | Mise à jour date |

## Table ARTICLE_CATEGORIE
| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| id_article_categorie | INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | Idendifiant |
| nom | TEXT | NOT NULL | nom de la catégorie |
| couleur_hex | TEXT | NOT NULL | Code hexadécimale de la couleur |

## Table SIGNALEMENT_STATUS
| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| id_ signalement_status | INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | Idendifiant |
| nom | TEXT | NOT NULL | Nom du status |

## Table SIGNALEMENT_CATEGORIE
| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| id_signalement_categorie | INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | Idendifiant |
| nom | TEXT | NOT NULL | Nom de la catégorie |
| couleur_hex | TEXT | NOT NULL | Code hexadécimale de la couleur |
