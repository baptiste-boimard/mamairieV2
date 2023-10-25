-- Deploy mamairieV2

BEGIN;


CREATE TABLE IF NOT EXISTS public.town_hall (
  "town_hall_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "address" TEXT NOT NULL,
  "phonenumber" CHAR(10),
  "hourly" TEXT,
  "email" TEXT,
  "insee" TEXT NOT NULL UNIQUE,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

ALTER TABLE IF EXISTS public.town_hall
    OWNER to "mamairieV2";

CREATE TABLE IF NOT EXISTS public.admin (
  "admin_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "pseudo" VARCHAR(20) UNIQUE,
  "password" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "town_hall_id" INT, 
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  CONSTRAINT town_hall_id_fk FOREIGN KEY (town_hall_id)
    REFERENCES public.town_hall (town_hall_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID
);

ALTER TABLE IF EXISTS public.admin
  OWNER to "mamairieV2";

CREATE TABLE IF NOT EXISTS public.article_category (
  "article_category_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "hex_color" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

ALTER TABLE IF EXISTS public.article_category
  OWNER to "mamairieV2";

CREATE TABLE IF NOT EXISTS public.article (
  "article_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title"  VARCHAR(40) NOT NULL,
  "description" TEXT NOT NULL,
  "summary" TEXT,
  "image" TEXT,
  "author" TEXT NOT NULL,
  "admin_id" INT NOT NULL,
  "article_category_id" INT NOT NULL,
  "town_hall_id" INT NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  CONSTRAINT admin_id_fk FOREIGN KEY (admin_id)
    REFERENCES public.admin (admin_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID,
  CONSTRAINT article_category_id_fk FOREIGN KEY (article_category_id)
    REFERENCES public.article_category (article_category_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID,
  CONSTRAINT town_hall_id_fk FOREIGN KEY (town_hall_id)
    REFERENCES public.town_hall (town_hall_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID
);

ALTER TABLE IF EXISTS public.article
  OWNER to "mamairieV2";

CREATE TABLE IF NOT EXISTS public.service ( 
  "service_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "phonenumber" CHAR(10) NOT NULL ,
  "address" TEXT NOT NULL ,
  "email" TEXT NOT NULL ,
  "image" TEXT,
  "town_hall_id" INT NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  CONSTRAINT town_hall_id_fk FOREIGN KEY (town_hall_id)
    REFERENCES public.town_hall (town_hall_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID
);

ALTER TABLE IF EXISTS public.service
  OWNER to "mamairieV2";

CREATE TABLE IF NOT EXISTS public.town_hall_staff (
  "town_hall_staff_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "firstname" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "photo" TEXT,
  "town_hall_id" INT NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  CONSTRAINT town_hall_id_fk FOREIGN KEY (town_hall_id)
    REFERENCES public.town_hall (town_hall_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID
);

ALTER TABLE IF EXISTS public.town_hall_staff
  OWNER to "mamairieV2";

CREATE TABLE IF NOT EXISTS public.reporting_category (
  "reporting_category_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "hex_color" TEXT,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

ALTER TABLE IF EXISTS public.reporting_category
  OWNER to "mamairieV2";

CREATE TABLE IF NOT EXISTS public.reporting_status (
  "reporting_status_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

ALTER TABLE IF EXISTS public.reporting_status
  OWNER to "mamairieV2";

CREATE TABLE IF NOT EXISTS public.reporting (
  "reporting_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title"  VARCHAR(50) NOT NULL,
  "email" TEXT NOT NULL,
  "phonenumber" CHAR(10),
  "firstname" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "ip" TEXT NOT NULL,
  "image" TEXT,
  "admin_text" TEXT,
  "admin_image" TEXT,
  "reporting_category_id" INT NOT NULL,
  "reporting_status_id" INT NOT NULL SET DEFAULT 1,
  "town_hall_id" INT NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  CONSTRAINT reporting_category_id_fk FOREIGN KEY (reporting_category_id)
    REFERENCES public.reporting_category (reporting_category_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID,
  CONSTRAINT reporting_status_id_fk FOREIGN KEY (reporting_status_id)
    REFERENCES public.reporting_status (reporting_status_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID,
  CONSTRAINT town_hall_id_fk FOREIGN KEY (town_hall_id)
    REFERENCES public.town_hall (town_hall_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID
);

ALTER TABLE IF EXISTS public.reporting
  OWNER to "mamairieV2";

COMMIT;