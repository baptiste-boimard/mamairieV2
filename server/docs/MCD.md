# SCHEMA MCD MODOCO

DEFINIR, 11 ARTICLE, 0N ARTICLE_CATEGORY
ARTICLE: id_article, title, description, summary, image, author, created_at
:
:
:
:

ARTICLE_CATEGORY: category_id, name, hex_color
ECRIRE, 0N ADMIN, 11 ARTICLE
ADMIN: id_admin, pseudo, password, email
POSSEDER, 11 ADMIN, 0N TOWN_HALL
:
:

CATEGORISER, 11 REPORTING, 0N REPORTING_CATEGORY
REPORTING: reporting_id, title, email, phonenumber, firstname, lastname, description, ip, image, admin_text, admin_image, created_at
EMMETRE, 11 REPORTING, 0N TOWN_HALL
TOWN_HALL: town_hall_id, name, address, phonenumber, hourly, email, insee
RECENSER, 0N TOWN_HALL, 11 SERVICE
SERVICE: service_id, name, phonenumber, address, email, image

REPORTING_CATEGORY: reporting_category_id, name, hex_color
STATUER, 11 REPORTING, 0N REPORTING_STATUS
REPORTING_STATUS: reporting_status_id, name
TRAVAILLER, 11 TOWN_HALL_STAFF, 0N TOWN_HALL
TOWN_HALL_STAFF: town_hall_staff_id, firstname, lastname, role, photo
:
