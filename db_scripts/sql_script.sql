-- revoke priv if exist fun
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
-- create admin
DROP ROLE IF EXISTS "mfip_admin";



CREATE USER mfip_admin WITH ENCRYPTED PASSWORD 'root';
-- get privileges

\connect mfip;

CREATE TABLE "Adres" (
        "id" SERIAL PRIMARY KEY,
        "country" varchar(20) NULL,
        "city" varchar(30) NULL,
        "street" varchar(40) NULL,
        "house_number" varchar(10),
        "zip_code" varchar(15) NULL,
        "is_company" boolean
);

CREATE TABLE "Company" (
        "id" SERIAL PRIMARY KEY,
        "password" varchar(60) NOT NULL,
        "name" varchar(50) NOT NULL,
        "email" varchar(30),
        "specialization" varchar(100) NOT NULL,
        "description" varchar(500) NOT NULL,
        "website" varchar(100),
        "image" bytea
);

CREATE TABLE "Skill" (
        "id" SERIAL PRIMARY KEY,
        "type" varchar(30) NOT NULL,
        "from" date,
        "to" date,
        "name" varchar(30) NOT NULL,
        "description" varchar(50)
);


CREATE TABLE "List_Skills" (
        "id" SERIAL PRIMARY KEY,
        "id_skill" SERIAL,
        "id_owner" SERIAL,
        "is_company" boolean NOT NULL,
        FOREIGN KEY ("id_skill") REFERENCES "Skill"("id")
);
CREATE INDEX "List_Skills_id_list_skills"
        ON "List_Skills" ("is_company","id_owner");

CREATE TABLE "Workstation" (
        "id" SERIAL PRIMARY KEY,
        "id_company" SERIAL,
        "id_adres" SERIAL,
        "id_list_skills" SERIAL,
        "name" varchar(30) NOT NULL,
        "phone_number" varchar(20),
        "email" varchar(30),
        "limit" smallserial NOT NULL,
        "description" varchar(50) NOT NULL,
        FOREIGN KEY ("id_adres") REFERENCES "Adres"("id"),
        FOREIGN KEY ("id_company") REFERENCES "Company"("id")--,
        --FOREIGN KEY ("id_list_skills") REFERENCES "Workstation"("id_owner")
);
CREATE INDEX "Workstation_id_company"
        ON "Workstation" ("id_company");

CREATE TABLE "Employee" (
        "id" SERIAL PRIMARY KEY,
        "id_adres" SERIAL,
        "id_list_skills" SERIAL,
        "password" varchar(60) NOT NULL,
        "first_name" varchar(20) NOT NULL,
        "last_name" varchar(20) NOT NULL,
        "birth" date NOT NULL,
        "phone_number" varchar(20) NOT NULL,
        "email" varchar(30) NOT NULL,
        "image" bytea,
        FOREIGN KEY ("id_adres") REFERENCES "Adres"("id")--,
        --FOREIGN KEY ("id_list_skills") REFERENCES "List_Skills"("id_owner"),
);

CREATE TABLE "Work_History" (
        "id" SERIAL PRIMARY KEY,
        "id_company" SERIAL,
        "id_emplyee" SERIAL,
        "from" date NOT NULL,
        "to" date,
        "description" varchar(50),
        FOREIGN KEY ("id_company") REFERENCES "Company"("id"),
        FOREIGN KEY ("id_emplyee") REFERENCES "Employee"("id")
);
-- CREATE INDEX "Work_History_id_company"
--         ON "Work_History" ("id_company");
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO mfip_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO mfip_admin;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO mfip_admin;

-- Adress
INSERT INTO public."Adres"(
        country, city, street, house_number, zip_code, is_company)
        VALUES
        ('Poland', 'Gdansk', 'Slowackiego', '173', '80-298', TRUE),
        ('Poland', 'Warszawa', 'Al. Jerozolimskie', '195a', '02-222', TRUE),
        ('Poland', 'Warszawa', 'Przyokopowa', '31', '01-208', TRUE),
        ('Poland', 'Warszawa', 'Wojska Polskiego', '3a', '03-204', FALSE),
        ('Poland', 'Gdansk', 'Grunwaldzka', '23', '81-304', FALSE),
        ('Polska', 'Gdańsk', 'Matki Polki', '4/2', '80-251', FALSE),
        ('Polska', 'Warszawa', 'Domaniewska', '39A', '02-672', TRUE);

\set c1 `cat b_c_1`
\set c2 `cat b_c_2`
\set c3 `cat b_c_3`

-- Company (rounds:15)
-- intel        $2y$15$.Ee3wLjUL2zdOMg215J7HuoIDLTumjauL/j7LKefScIQXpPJhSaFy
INSERT INTO public."Company"(
	password, name, email, specialization, description, website, image)
	VALUES ('$2b$15$Pp5hbTT9oCNfDErfD73A5u4ymcKc7LeiLx0u7qQlFnK2oMf32KSvS','intel', 'intel@mail.com', 'processors & e.t.c.', 'big company', 'www.intel.com',
        :'c1');
        --make_lo('/home/matt/mfip/db_scripts/image_c_1.png')
        --loread(lo_open(\loread, 131072)
-- microsoft    $2y$15$UciW4TzqSkYgb8gLjIkqFeyXQ3.ki0ux8R/HC8AgmE5ErNcB4OSvO
INSERT INTO public."Company"(
	password, name, email, specialization, description, website, image)
	VALUES ('$2b$15$mopY0BAwsiOITAsEuxS49.UFBTAiXiIMtfhs2h7e9Nf89.S0DtMV2','microsoft', 'microsoft@mail.com', 'OS & e.t.c.', 'big company', 'www.microsoft.com',
        :'c2');
-- oracle       $2y$15$ZnJCM7ZpXF17kDlxsmaQX.elF6E0aTqufb0DfKes0QRgPWrSyvNi2
INSERT INTO public."Company"(
	password, name, email, specialization, description, website, image)
	VALUES ('$2b$15$8T4aAE8PsUG1cQ7WYugoS.SRuAlo553t9nh.i8DXBGlBVegt8Nqfe','oracle', 'oracle@mail.com', 'JAVA & e.t.c.', 'big company', 'www.oracle.com',
        :'c3');

INSERT INTO public."Company"(
  password, name, email, specialization, description, website)
  VALUES ('$2b$15$LgEOo7hoj0eWpc8G/LWEeOtutvRTcJq4DizgkHOftxOq6BxVnU.Ae', 'Ubisoft', 'support@ubisoft.com', 'Game Development', 'French Company', 'www.ubisoft.com');

-- Skill
INSERT INTO public."Skill"(
	type, "from", "to", name, description)
	VALUES
  ('Skill', null, null, 'js', 'java script'),
  ('Skill', null, null, 'java', 'java'),
  ('Skill', null, null, 'SQL', 'relation db'),
	('Skill', null, null, 'comunication', 'soft skill');

-- List_Skills
-- for workspases
INSERT INTO public."List_Skills"(
	id_skill, id_owner, is_company)
	VALUES
  (1, 1, TRUE),
  (4, 2, TRUE),
  (2, 2, TRUE),
  (3, 3, TRUE);

-- for emplyee
INSERT INTO public."List_Skills"(
	id_skill, id_owner, is_company)
	VALUES
  (3, 2, FALSE),
  (1, 1, FALSE),
  (3, 1, FALSE),
  (4, 1, FALSE);

-- Workstation
INSERT INTO public."Workstation"(
	id_company, id_adres, name, phone_number, email, "limit", description)
	VALUES
  (1, 1, 'Web Deweloper', '+48573324665', 'manager1@mail.com', 15, 'new Web project'),
  (2, 2, 'Project Manager', '+48258324662', 'manager2@mail.com', 10, 'Web projects managers'),
  (3, 3, 'DB Administrator', '+48328323424', 'manager2@mail.com', 20, 'Web projects managers'),
  (4, 7, 'Web Developer', '801702603', 'poland@ubisoft.com', 10, 'Ubisoft Official Workstation'),
  (4, 7, 'Web Designer', '801702603', 'poland@ubisoft.com', 10, 'Ubisoft Official Workstation'),
  (4, 7, 'Web Master', '801702603', 'poland@ubisoft.com', 10, 'Ubisoft Official Workstation'),
  (4, 7, 'DB Administrator', '801702603', 'poland@ubisoft.com', 10, 'Ubisoft Official Workstation'),
  (4, 7, 'Project Manager', '801702603', 'poland@ubisoft.com', 10, 'Ubisoft Official Workstation');

-- Employee (rounds: 10)
-- jkowalski    $2y$10$S.jV0RWbveAJAc8.6DnbM.Lu76b/br2AYoSGhcBnO7THIXu4dy37K
INSERT INTO public."Employee"(
	id_adres, password, first_name, last_name, birth, phone_number, email)
	VALUES (4,'$2b$10$t0yGUNKJYHJ1IPZMhRO3m./WLSppdGYClg239tOJGVLXhy0QGWeiy', 'Jan', 'Kowalski',  to_date('1985-02-03','YYYY-MM-DD'), '+48793650366', 'jkowalski@mail.com');
-- kborawski
INSERT INTO public."Employee"(
	id_adres, password, first_name, last_name, birth, phone_number, email)
	VALUES (5,'$2b$10$rxv6KMH/BKL6yu4cRNYq9umD74Ii5dw0U2sRr64HZmDILMqNHneIG', 'Karol', 'Borawski',  to_date('1995-02-03','YYYY-MM-DD'), '+48593350631', 'kborawski@mail.com');

INSERT INTO public."Employee"(
	id_adres, password, first_name, last_name, birth, phone_number, email)
	VALUES (6,'$2b$10$lbL6QFhEUZsMap2DYWfeDuWJl12ot.41xihmkoosQz.E4RTDVs3mK', 'Mariusz', 'Mazepa',  to_date('1994-01-19','YYYY-MM-DD'), '515402122', 'maksymilianmariusz@gmail.com');

-- Work_History
INSERT INTO public."Work_History"(
	id_company, id_emplyee, "from", "to", description)
	VALUES
  (3, 1, to_date('2010-02-03','YYYY-MM-DD'), to_date('2015-02-03','YYYY-MM-DD'), 'my first job'),
  (2, 1, to_date('2016-02-03','YYYY-MM-DD'), to_date('2017-02-03','YYYY-MM-DD'), 'my second job'),
  (1, 1, to_date('2018-02-03','YYYY-MM-DD'), NULL, 'my current job'),
  (2, 2, to_date('2010-02-03','YYYY-MM-DD'), NULL, 'first job'),
  (1, 3, to_date('2012-07-01','YYYY-MM-DD'), to_date('2012-08-31','YYYY-MM-DD'), 'wakacyjny staż'),
  (4, 3, to_date('2018-07-01','YYYY-MM-DD'), to_date('2018-08-31','YYYY-MM-DD'), 'praktyki zawodowe'),
  (4, 1, to_date('2018-07-01','YYYY-MM-DD'), to_date('2018-08-31','YYYY-MM-DD'), 'praktyki zawodowe'),
  (4, 2, to_date('2018-07-01','YYYY-MM-DD'), to_date('2018-08-31','YYYY-MM-DD'), 'praktyki zawodowe');
