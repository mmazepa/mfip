/*jshint node: true, esversion: 6 */

const db = require("../config/postgres.js");
const bcrypt = require('bcrypt');
const Company = module.exports;

// C
Company.createCompany = (paramerts_json) => {

    paramerts_json.password = bcrypt.hashSync(paramerts_json.password, 15);

    return db.one(
        'INSERT INTO "Company"(password, name, email, specialization, description) ' +
        'VALUES(${password}, ${name}, ${email}, ${specialization}, ${description}) RETURNING id',
            paramerts_json);
};

// R
Company.findAll = () => {
    return db.any('SELECT * FROM "Company" AS "c"', [true]);
};

Company.findAllWithWorkstations = () => {
    const workingString = 'SELECT w.id, w.name AS workstation, w.phone_number, ' +
                            'w.email AS workstation_email, w.limit, ' +
                            'w.description AS workstation_description, ' +
                            'c.name AS company, c.email AS company_email, ' +
                            'c.specialization, c.description AS company_description, ' +
                            'c.website, c.image, a.country, a.city, a.street, ' +
                            'a.house_number, a.zip_code FROM "Workstation" AS w ' +
                            'INNER JOIN "Company" AS c ON w.id_company=c.id ' +
                            'INNER JOIN "Adres" AS a ON w.id_adres=a.id;';
    return db.any(workingString, [true]);
};

Company.findByName = (name) => {
    return db.one('SELECT c.id, c.name, c.email, c.specialization, c.description, c.website, c.image ' +
        'FROM "Company" AS "c" ' +
        'WHERE c.name = $1', [name]);
};

Company.findById = (id) => {
    return db.one('SELECT c.id, c.name, c.email, c.specialization, c.description, c.website, c.image ' +
        'FROM "Company" AS "c" ' +
        'WHERE c.id = $1', [id]);
};

Company.getImage = (id_company) => {
    return db.one('SELECT c.image ' +
        'FROM "Company" AS "c" ' +
        'WHERE c.id = $1', [id_company]);
};

Company.setNewImage = (id_company, image) => {
    return db.none('UPDATE "Company" ' +
                'SET "image"= $2 ' +
                'WHERE id= $1', [id_company, image]);
};

Company.workers = (id) => {
    const workersString = 'SELECT e.id AS employee_id, e.image, e.first_name, e.last_name, ws.is_accepted, ' +
                            'w.name AS workstation, w.id AS workstation_id, w.email, ws.from, ws.to ' +
                            'FROM "Work_History" AS ws ' +
                            'INNER JOIN "Employee" AS e ON ws.id_employee=e.id ' +
                            'INNER JOIN "Workstation" AS w ON ws.id_workstation=w.id ' +
                            'INNER JOIN "Company" AS c ON w.id_company=c.id WHERE c.id=' + id;
    return db.any(workersString, [true]);
};

Company.addWorker = (id_workstation, id_employee) => {
    const addWorkerQuery = 'INSERT INTO "Work_History" ' +
                    '(id_workstation, id_employee, "from", "to", description, is_accepted) '+
                    'VALUES (\'' + id_workstation + '\', \'' + id_employee +
                            '\', NULL, NULL, NULL, FALSE)';
    return db.none(addWorkerQuery);
};

Company.acceptWorker = (id_workstation, id_employee) => {
    const acceptQuery = 'UPDATE "Work_History" SET is_accepted=true, ' +
                        '"from"=current_date ' +
                        'WHERE id_workstation=' + id_workstation +
                        ' AND id_employee=' + id_employee +
                        ' AND "from" IS NULL AND (is_accepted=false OR is_accepted=NULL)';
    return db.none(acceptQuery);
};

Company.fireWorker = (id_workstation, id_employee) => {
    const fireWorkerQuery = 'UPDATE "Work_History" ' +
                            'SET "to"=current_date ' +
                            'WHERE id_workstation=' + id_workstation + ' ' +
                            'AND id_employee=' + id_employee + ' ' +
                            'AND "to" IS NULL';
    return db.none(fireWorkerQuery);
};

//hash
Company.getHashByEmail = (email) => {
    return db.one('SELECT * ' +
        'FROM "Company" AS "c" ' +
        'WHERE c.email = $1', [email]);
};

Company.add = (name, specialization, description, email, website) => {
    const addQuery = 'INSERT INTO "Company" (name, specialization, description, email, website, password) ' +
                        'VALUES (\'' + name + '\', \'' + specialization + '\', \'' + description + '\', \'' + email + '\', \'' + website + '\', \'firm1234\') ' +
                        'RETURNING id';
    return db.one(addQuery);
};

// update firm info
Company.updateFirmInfo = (newFirmInfo) => {
    return db.none('UPDATE "Company" SET ' +
                    'name=${name}, ' +
                    'specialization=${specialization}, ' +
                    'description=${description}, ' +
                    'email=${email}, ' +
                    'website=${website} ' +
                    'WHERE id=${id}',
                    newFirmInfo);
};

Company.remove = (id) => {
    const removeQuery = 'DELETE FROM "Company" WHERE id=' + id;
    return db.result(removeQuery);
};
