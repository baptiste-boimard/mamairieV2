# Dictionnaire des données

## Table ADMIN

| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| admin_id| INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | Identifiant |
| pseudo | CHAR(20) | NOT NULL | Ppseudo utilisateur admin |
| password | TEXT | NOT NULL | Password de l'utilisateur admin |
| email | TEXT | NOT NULL UNIQUE| Email de l'utilisateur admin |
| town_hall_id | INT | REFERENCES town_hall(id_town_hall) | Idendifiant de la town_hall |
| created_at | TIMESTAMPTZ | DEFAULT NOW()| Création date |
| updated_at | TIMESTAMPTZ | | Mise à jour date|

## Table REPORTING

| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| reporting_id | INT |GENERATED ALWAYS AS IDENTITY PRIMARY KEY| Idendifiant |
| title | VARCHAR(50) | NOT NULL | title du signalement |
| email | TEXT | NOT NULL | Email du visiteur |
| phonenumber | CHAR(10) | NOT NULL | Téléphone du visiteur |
| firstname | TEXT | NOT NULL | Prélastname du visiteur |
| lastname | TEXT | NOT NULL | lastname du visiteur |
| description | TEXT |NOT NULL | Description du signalement par le visiteur |
| ip | TEXT | NOT NULL | address IP du visiteur |
| image | TEXT | | address de stockage de l'image ajoutée par le visiteur |
| admin_text | TEXT | | Réponse de l'admin |
| admin_image | TEXT | | address de stockage de l'image ajoutée par l'admin |
| reporting_category_id | TEXT | REFERENCES signalement_categorie(id_signalement_categorie) | Idendifiant de la catégorie du signalement |
| reporting_status_id | TEXT | REFERENCES signalement_status(id_signalement_status) SET DEFAULT 1 | Idendifiant du status du signalement |
| town_hall_id | INT | REFERENCES town_hall(id_town_hall) | Idendifiant de la town_hall |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Création date |
| updated_at | TIMESTAMPTZ | | Mise à jour date |



## Table ARTICLE

| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| article_id | INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | Idendifiant |
| title | VARCHAR(40) | NOT NULL | title de l'article |
| description | TEXT | NOT NULL | Texte de l'article |
| summary | TEXT | | Résumé de l'article |
| image | TEXT | | address de l'image de l'article |
| author | TEXT | NOT NULL | Auteur de l'article |
| admin_id | INT | NOT NULL | REFERENCES admin(id_admin) | Idendifiant de l'admin |
| article_category_id | INT | NOT NULL | REFERENCES article_category(article_category_id) | Idendifiant de la catégorie de l'article |
| town_hall_id | INT | NOT NULL | REFERENCES town_hall(town_hall_id) | Idendifiant de la town_hall |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Création date |
| updated_at | TIMESTAMPTZ | | Mise à jour date |


## Table SERVICE

| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| service_id | INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | Idendifiant |
| name | TEXT | NOT NULL | lastname du service |
| phonenumber | CHAR(10) | NOT NULL | Téléphone du service |
| address | TEXT | NOT NULL | address du service |
| email | TEXT | NOT NULL | Email du service |
| image | TEXT | | address de l'image de la photo du service |
| town_hall_id | INT | REFERENCES town_hall(id_town_hall) | Idendifiant de la town_hall |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Création date |
| updated_at | TIMESTAMPTZ | | Mise à jour date |


## Table TOWN_HALL
| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
|town_hall_id | INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | Identifiant |
| name | TEXT | NOT NULL UNIQUE | lastname de la town_hall |
| address | TEXT | NOT NULL | address de la town_hall |
| phonenumber | CHAR(10) | |Téléphone de la town_hall |
| hourly | TEXT | | Horaires de la town_hall |
| email | TEXT | | Email de la town_hall |
| insee | TEXT | NOT NULL UNIQUE | Numéros insee de la town_hall |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Création date |
| updated_at | TIMESTAMPTZ | | Mise à jour date |

## Table TOWN_HALL_STAFF
| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| town_hall_staff_id | INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | Identifiant |
| firstname | TEXT | NOT NULL | Prélastname de la personne |
| lastname | TEXT | NOT NULL | lastname de la personne |
| role | TEXT | NOT NULL | Fonction de la personne |
| photo | TEXT | | address de la photo de la personne |
| town_hall_id | INT | REFERENCES town_hall(town_hall_id) | Idendifiant de la town_hall |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Création date |
| updated_at | TIMESTAMPTZ | | Mise à jour date |

## Table ARTICLE_CATEGORY
| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| article_category_id | INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | Idendifiant |
| name | TEXT | NOT NULL | lastname de la catégorie |
| hex_color | TEXT | | Code hexadécimale de la couleur |

## Table REPORTING_STATUS
| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| reporting_status_id | INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | Idendifiant |
| name | TEXT | NOT NULL | lastname du status |

## Table REPORTING_CATEGORY
| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| reporting_category_id | INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | Idendifiant |
| name | TEXT | NOT NULL | lastname de la catégorie |
| hex_color | TEXT | NOT NULL | Code hexadécimale de la couleur |
