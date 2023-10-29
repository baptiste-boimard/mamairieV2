# MLD 

ARTICLE(article_id, title, description, summary, image, author, admin_id, article_category_id, town_hall_id, created_at)

ARTICLE_CATEGORY(article_category_id, name, hex_color)

ADMIN(id_admin, pseudo, password, email, town_hall_id)

TOWN_HALL(town_hall_id, name, address, phonenumber, houry, email, insee)

TOWN_HAL_STAFF(town_hall_staff_id, firstname, lastname, role, photo, town_hall_id)

SERVICE(service_id, name, phonenumber, address, email, image, town_hall_id)

REPORTING(reporting_id, tite, email, phonenumber, firstname, lastname, description, ip, image, admin_text, admin_image, reporting_category_id, reporting_status_id, town_hall_id, created_at)

REPORTING_STATUS(reporting_status_id, name)

REPORTING_CATEGORY(reporting_category_id, name, hex_color)