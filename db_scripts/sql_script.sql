-- create db
DROP DATABASE IF EXISTS mfip;
CREATE DATABASE mfip;
-- create admin
-- DROP ROLE IF EXISTS "admin";



CREATE USER mfip_admin WITH ENCRYPTED PASSWORD 'root';
-- get privileges
GRANT ALL ON DATABASE mfip TO mfip_admin;

\connect mfip;


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

CREATE TABLE "Vacation_History" (
        "id" SERIAL PRIMARY KEY,
        "confirmed" boolean,
        "from" date,
        "to" date,
        "description" varchar(50)
);


CREATE TABLE "Work_History" (
        "id" SERIAL PRIMARY KEY,
        "id_company" SERIAL,
        "id_vacation" SERIAL,
        "from" date,
        "to" date,
        "salary" money,
        "description" varchar(50),
        FOREIGN KEY ("id_vacation") REFERENCES "Vacation_History"("id")
);
CREATE INDEX "Work_History_id_company"
        ON "Work_History" ("id_company");


CREATE TABLE "Group_History" (
        "id" SERIAL PRIMARY KEY,
        "id_work_history" SERIAL,
        "id_vocation_history" SERIAL,
        FOREIGN KEY ("id_vocation_history") REFERENCES "Vacation_History"("id"),
        FOREIGN KEY ("id_work_history") REFERENCES "Work_History"("id")
);

CREATE TABLE "Adres" (
        "id" SERIAL PRIMARY KEY,
        "country" varchar(20),
        "city" varchar(30),
        "street" varchar(40),
        "house_number" varchar(10),
        "zip_code" varchar(15)
);

CREATE TABLE "Employee" (
        "id" SERIAL PRIMARY KEY,
        "id_adres" SERIAL,
        "id_history" SERIAL,
        "password" varchar(32),
        "first_name" varchar(20),
        "last_name" varchar(20),
        "birth" date,
        "phone_number" varchar(20),
        "email" varchar(30),
        FOREIGN KEY ("id_adres") REFERENCES "Adres"("id"),
        FOREIGN KEY ("id_history") REFERENCES "Vacation_History"("id")
);

CREATE TABLE "Workstation" (
        "id" SERIAL PRIMARY KEY,
        "id_company" SERIAL UNIQUE NOT NULL,
        "id_adres" SERIAL,
        "name" varchar(30),
        "phone_number" varchar(20),
        "email" varchar(30),
        "limit" smallserial,
        "description" varchar(50),
        FOREIGN KEY ("id") REFERENCES "Employee"("id"),
        FOREIGN KEY ("id_adres") REFERENCES "Adres"("id")
);
CREATE INDEX "Workstation_id_company"
        ON "Workstation" ("id_company");


CREATE TABLE "Company" (
        "id" SERIAL PRIMARY KEY,
        "id_adres" SERIAL,
        "password" varchar(32),
        "name" varchar(50),
        "email" varchar(30),
        "global_id" varchar(100),       -- NIP or same
        "specialization" varchar(100),
        "description" varchar(500),
        "website" varchar(100),
        FOREIGN KEY ("id") REFERENCES "Workstation"("id_company"),
        UNIQUE("id_adres"),
        FOREIGN KEY ("id_adres") REFERENCES "Adres"("id")
);


CREATE TABLE "Skill" (
        "id" SERIAL PRIMARY KEY,
        "name" varchar(30),
        "description" varchar(50)
);

CREATE TABLE "List_Skills" (
        "id" SERIAL PRIMARY KEY,
        "id_skill" SERIAL,
        "id_list_skills" SERIAL,
        "name" varchar(30),
        "description" varchar(50),
        "is_company" boolean,
        FOREIGN KEY ("id_skill") REFERENCES "Skill"("id"),
        FOREIGN KEY ("id_list_skills") REFERENCES "Employee"("id"),
        FOREIGN KEY ("id_list_skills") REFERENCES "Workstation"("id")
);
CREATE INDEX "List_Skills_id_list_skills"
        ON "List_Skills" ("id_list_skills");
