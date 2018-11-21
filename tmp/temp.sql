-- create db
--DROP DATABASE IF EXISTS mfip;
--CREATE DATABASE mfip;
-- create admin
-- DROP ROLE IF EXISTS "admin";

\connect mfip;

--REVOKE CONNECT ON DATABASE mfip_admin TO mfip_admin;
DO $$DECLARE count int;
BEGIN
SELECT count(*) INTO count FROM pg_roles WHERE rolname = 'mfip_admin';
IF count > 0 THEN
    EXECUTE 
        '
                REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM mfip_admin;
                REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public FROM mfip_admin;
                REVOKE ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public FROM mfip_admin;
        ';
END IF;
END$$;
--REVOKE ALL ON mfip TO mfip_admin;
-- No privileges left, now it should be possible to drop
DROP USER IF EXISTS mfip_admin;

--DROP USER IF EXISTS name mfip_admin;

CREATE USER mfip_admin WITH ENCRYPTED PASSWORD 'root';
-- get privileges
--GRANT CONNECT ON DATABASE mfip_admin TO mfip_admin;
--GRANT USAGE ON SCHEMA public TO mfip_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO mfip_admin;
-- GRANT CONNECT ON DATABASE mfip TO mfip_admin;

-- GRANT ALL PRIVILEGES ON DATABASE mfip TO mfip_admin;
-- GRANT ALL PRIVILEGES ON DATABASE mfip TO mfip_admin;

-- GRANT USAGE ON SCHEMA public TO mfip_admin;
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO mfip_admin;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO mfip_admin;
-- GRANT EXECUTE ON ALL FUNCTIONS ON DATABASE mfip TO mfip_admin;

-- GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO mfip_admin;
-- GRANT SELECT ON mfip TO mfip_admin;
-- GRANT SELECT ON ALL TABLES IN SCHEMA public TO mfip_admin;
-- GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO mfip_admin;
-- GRANT ALL ON DATABASE mfip TO mfip_admin WITH GRANT OPTION;


DROP INDEX IF EXISTS "Work_History_id_company";
DROP INDEX IF EXISTS "Workstation_id_company";
DROP INDEX IF EXISTS "List_Skills_id_list_skills";

DROP TABLE IF EXISTS "List_Skills";
DROP TABLE IF EXISTS "Skill";
DROP TABLE IF EXISTS "Company";
DROP TABLE IF EXISTS "Workstation";
DROP TABLE IF EXISTS "Employee";
DROP TABLE IF EXISTS "Group_History";
DROP TABLE IF EXISTS "Work_History";
DROP TABLE IF EXISTS "Vacation_History";
DROP TABLE IF EXISTS "Adres";

-- CREATE TABLE "Vacation_History" (
--         "id" SERIAL PRIMARY KEY,
--         "confirmed" boolean NOT NULL,
--         "from" date NOT NULL,
--         "to" date NOT NULL,
--         "description" varchar(50)
-- );


CREATE TABLE "Work_History" (
        "id" SERIAL PRIMARY KEY,
        "id_company" SERIAL,
        -- "id_vacation" SERIAL,
        "from" date NOT NULL,
        "to" date,
        "salary" money NOT NULL,
        "description" varchar(50),
        FOREIGN KEY ("id_vacation") REFERENCES "Vacation_History"("id")
);
CREATE INDEX "Work_History_id_company"
        ON "Work_History" ("id_company");


CREATE TABLE "Group_History" (
        "id" SERIAL PRIMARY KEY,
        "id_work_history" SERIAL,
        "id_vacation_history" SERIAL,
        FOREIGN KEY ("id_vacation_history") REFERENCES "Vacation_History"("id"),
        FOREIGN KEY ("id_work_history") REFERENCES "Work_History"("id")
);

CREATE TABLE "Adres" (
        "id" SERIAL PRIMARY KEY,
        "country" varchar(20) NOT NULL,
        "city" varchar(30) NOT NULL,
        "street" varchar(40) NOT NULL,
        "house_number" varchar(10),
        "zip_code" varchar(15) NOT NULL
);

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
        FOREIGN KEY ("id_adres") REFERENCES "Adres"("id"),
        FOREIGN KEY ("id_history") REFERENCES "Vacation_History"("id")
);

CREATE TABLE "Workstation" (
        "id" SERIAL PRIMARY KEY,
        "id_company" SERIAL UNIQUE NOT NULL,
        "id_adres" SERIAL,
        "name" varchar(30) NOT NULL,
        "phone_number" varchar(20),
        "email" varchar(30),
        "limit" smallserial NOT NULL,
        "description" varchar(50) NOT NULL,
        FOREIGN KEY ("id") REFERENCES "Employee"("id"),
        FOREIGN KEY ("id_adres") REFERENCES "Adres"("id")
);
CREATE INDEX "Workstation_id_company"
        ON "Workstation" ("id_company");


CREATE TABLE "Company" (
        "id" SERIAL PRIMARY KEY,
        "id_adres" SERIAL,
        "password" varchar(32) NOT NULL,
        "name" varchar(50) NOT NULL,
        "email" varchar(30),
        "global_id" varchar(100) NOT NULL,       -- NIP or same
        "specialization" varchar(100) NOT NULL,
        "description" varchar(500) NOT NULL,
        "website" varchar(100),
        FOREIGN KEY ("id") REFERENCES "Workstation"("id_company")--,
        -- UNIQUE("id_adres"),
        -- FOREIGN KEY ("id_adres") REFERENCES "Adres"("id")
);


CREATE TABLE "Skill" (
        "id" SERIAL PRIMARY KEY,
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


INSERT INTO public."Adres"
(
        country, city, street, house_number, zip_code
)
VALUES 
(
        'Poland', 'Gdansk', 'Slowackiego', '173', '80-298'
);

INSERT INTO public."Adres"
(
        country, city, street, house_number, zip_code
)
VALUES 
(
        'Poland', 'Gdansk', 'Slowackiego', '173', '80-298'
);