-- Deploy mamairieV2

BEGIN;


CREATE TABLE IF NOT EXISTS public.mairie (
  "id_mairie" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "nom" TEXT NOT NULL UNIQUE,
  "adresse" TEXT NOT NULL,
  "telephone" CHAR(10),
  "horaire" TEXT,
  "email" TEXT,
  "insee" TEXT NOT NULL UNIQUE,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

ALTER TABLE IF EXISTS public.mairie
    OWNER to "mamairieV2";

CREATE TABLE IF NOT EXISTS public.admin (
  "id_admin" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "pseudo" VARCHAR(20) UNIQUE,
  "password" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "mairie_id" INT NOT NULL, 
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  CONSTRAINT mairie_id_fk FOREIGN KEY (mairie_id)
    REFERENCES public.mairie (id_mairie) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID
);

ALTER TABLE IF EXISTS public.admin
  OWNER to "mamairieV2";

CREATE TABLE IF NOT EXISTS public.article (
  "id_article" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "titre"  VARCHAR(40) NOT NULL,
  "description" TEXT NOT NULL,
  "resume" TEXT,
  "image" TEXT,
  "auteur" TEXT NOT NULL,
  "admin_id" INT NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  CONSTRAINT admin_id_fk FOREIGN KEY (admin_id)
    REFERENCES public.admin (id_admin) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID
);

ALTER TABLE IF EXISTS public.article
  OWNER to "mamairieV2";

CREATE TABLE IF NOT EXISTS public.service ( 
  "id_service" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "nom" TEXT NOT NULL,
  "telephone" CHAR(10) NOT NULL ,
  "adresse" TEXT NOT NULL ,
  "email" TEXT NOT NULL ,
  "image" TEXT,
  "mairie_id" INT NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  CONSTRAINT mairie_id_fk FOREIGN KEY (mairie_id)
    REFERENCES public.mairie (id_mairie) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID
);

ALTER TABLE IF EXISTS public.service
  OWNER to "mamairieV2";

CREATE TABLE IF NOT EXISTS public.personnel_mairie (
  "id_personnel_mairie" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "prenom" TEXT NOT NULL,
  "nom" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "photo" TEXT,
  "mairie_id" INT NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  CONSTRAINT mairie_id_fk FOREIGN KEY (mairie_id)
    REFERENCES public.mairie (id_mairie) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID
);

ALTER TABLE IF EXISTS public.personnel_mairie
  OWNER to "mamairieV2";

CREATE TABLE IF NOT EXISTS public.article_categorie (
  "id_article_categorie" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "nom" TEXT NOT NULL,
  "couleur_hex" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

ALTER TABLE IF EXISTS public.article_categorie
  OWNER to "mamairieV2";

CREATE TABLE IF NOT EXISTS public.signalement_status (
  "id_signalement_status" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "nom" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

ALTER TABLE IF EXISTS public.signalement_status
  OWNER to "mamairieV2";


CREATE TABLE IF NOT EXISTS public.signalement_categorie (
  "id_signalement_categorie" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "nom" TEXT NOT NULL,
  "couleur_hex" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

ALTER TABLE IF EXISTS public.signalement_categorie
  OWNER to "mamairieV2";


CREATE TABLE IF NOT EXISTS public.signalement (
  "id_signalement" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "titre"  VARCHAR(50) NOT NULL,
  "email" TEXT NOT NULL,
  "telephone" CHAR(10),
  "prenom" TEXT NOT NULL,
  "nom" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "ip" TEXT NOT NULL,
  "image" TEXT,
  "admin_text" TEXT,
  "admin_image" TEXT,
  "signalement_categorie_id" INT NOT NULL,
  "signalement_status_id" INT NOT NULL,
  "mairie_id" INT NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  CONSTRAINT signalement_categorie_id_fk FOREIGN KEY (signalement_categorie_id)
    REFERENCES public.signalement_categorie (id_signalement_categorie) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID,
  CONSTRAINT signalement_status_id_fk FOREIGN KEY (signalement_status_id)
    REFERENCES public.signalement_status (id_signalement_status) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID,
  CONSTRAINT mairie_id_fk FOREIGN KEY (mairie_id)
    REFERENCES public.mairie (id_mairie) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID
);

ALTER TABLE IF EXISTS public.signalement
  OWNER to "mamairieV2";

COMMIT;