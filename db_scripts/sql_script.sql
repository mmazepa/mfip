-- revoke priv if exist fun
DO $$DECLARE count int;
BEGIN
SELECT count(*) INTO count FROM pg_roles WHERE rolname = 'mfip_admin';
IF count > 0 THEN
    EXECUTE 
        '
                REVOKE ALL ON DATABASE mfip FROM mfip_admin;
        ';
END IF;
END$$;
-- create admin
DROP ROLE IF EXISTS "mfip_admin";



CREATE USER mfip_admin WITH ENCRYPTED PASSWORD 'root';
-- get privileges
GRANT ALL ON DATABASE mfip TO mfip_admin;

\connect mfip;

CREATE TABLE "Adres" (
        "id" SERIAL PRIMARY KEY,
        "id_adres" SERIAL,
        "country" varchar(20) NOT NULL,
        "city" varchar(30) NOT NULL,
        "street" varchar(40) NOT NULL,
        "house_number" varchar(10),
        "zip_code" varchar(15) NOT NULL,
        "is_company" boolean
);

CREATE TABLE "Company" (
        "id" SERIAL PRIMARY KEY,
        "password" varchar(32) NOT NULL,
        "name" varchar(50) NOT NULL,
        "email" varchar(30),
        "specialization" varchar(100) NOT NULL,
        "description" varchar(500) NOT NULL,
        "website" varchar(100),
        "image" bytea
);

CREATE TABLE "Workstation" (
        "id" SERIAL PRIMARY KEY,
        "id_company" SERIAL,
        "id_adres" SERIAL,
        "name" varchar(30) NOT NULL,
        "phone_number" varchar(20),
        "email" varchar(30),
        "limit" smallserial NOT NULL,
        "description" varchar(50) NOT NULL,
        FOREIGN KEY ("id_adres") REFERENCES "Adres"("id"),
        FOREIGN KEY ("id_company") REFERENCES "Company"("id")
);
CREATE INDEX "Workstation_id_company"
        ON "Workstation" ("id_company");

CREATE TABLE "Employee" (
        "id" SERIAL PRIMARY KEY,
        "id_adres" SERIAL,
        "id_history" SERIAL,
        "password" varchar(32) NOT NULL,
        "first_name" varchar(20) NOT NULL,
        "last_name" varchar(20) NOT NULL,
        "birth" date NOT NULL,
        "phone_number" varchar(20) NOT NULL,
        "email" varchar(30) NOT NULL,
        "image" bytea,
        FOREIGN KEY ("id_adres") REFERENCES "Adres"("id")
);


CREATE TABLE "Skill" (
        "id" SERIAL PRIMARY KEY,
        "type" varchar(30) NOT NULL,
        "name" varchar(30) NOT NULL,
        "description" varchar(50)
);


CREATE TABLE "List_Skills" (
        "id" SERIAL PRIMARY KEY,
        "id_skill" SERIAL,
        "id_list_skills" SERIAL,
        "is_company" boolean NOT NULL,
        FOREIGN KEY ("id_skill") REFERENCES "Skill"("id"),
        FOREIGN KEY ("id_list_skills") REFERENCES "Employee"("id"),
        FOREIGN KEY ("id_list_skills") REFERENCES "Workstation"("id")
);

CREATE INDEX "List_Skills_id_list_skills"
        ON "List_Skills" ("id_list_skills");



CREATE TABLE "Work_History" (
        "id" SERIAL PRIMARY KEY,
        "id_company" SERIAL,
        "from" date NOT NULL,
        "to" date,
        "description" varchar(50),
        FOREIGN KEY ("id_company") REFERENCES "Company"("id"),
        FOREIGN KEY ("id_company") REFERENCES "Employee"("id")
);
CREATE INDEX "Work_History_id_company"
        ON "Work_History" ("id_company");







