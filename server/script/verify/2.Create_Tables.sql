-- Verify matown_hallV2_sqitch:2.Create_Tables on pg

BEGIN;

SELECT "town_hall_id", "name", "address", "phonenumber", "hourly", "email", "insee", "created_at", "updated_at" FROM town_hall;
SELECT "admin_id", "pseudo", "password", "email", "town_hall_id", "created_at", "updated_at" FROM admin;
SELECT "article_id", "title", "description", "summary", "image", "author", "admin_id", "created_at", "updated_at" FROM article;
SELECT "service_id", "name", "phonenumber", "address", "email", "image", "town_hall_id", "created_at", "updated_at" FROM service;
SELECT "town_hall_staff_id", "firstname", "lastname", "role", "photo", "town_hall_id", "created_at", "updated_at" FROM town_hall_staff;
SELECT "article_category_id", "name", "hex_color", "created_at", "updated_at" FROM article_category;
SELECT "reporting_status_id", "name", "created_at", "updated_at" FROM reporting_status;
SELECT "reporting_category_id", "name", "hex_color", "created_at", "updated_at" FROM reporting_category;
SELECT "reporting_id", "title", "email", "phonenumber", "firstname", "lastname", "description", "ip", "image", "admin_text", "admin_image", "reporting_category_id", "reporting_status_id", "town_hall_id", "created_at", "updated_at" FROM reporting;

ROLLBACK;
