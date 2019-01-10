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

Company.setImage = (id_company, image) => {
    return db.none('UPDATE "Company" ' +
                'SET "image"= $2 ' +
                'WHERE id_company= $1', [id_company, image]);
};

Company.workers = (id) => {
    return db.any('SELECT e.id, e.first_name, e.last_name, e.email, wh.from, wh.to ' +
                    'FROM "Work_History" AS "wh" ' +
                    'INNER JOIN "Employee" AS "e" on wh.id_employee = e.id ' +
                    'WHERE id_company=$1', [id]);
};

Company.addWorker = (id_workstation, id_employee) => {
    const addWorkerQuery = 'INSERT INTO "Work_History" ' +
                    '(id_workstation, id_employee, "from", "to", description) '+
                    'VALUES (\'' + id_workstation + '\', \'' + id_employee +
                            '\', current_date, NULL, NULL)';
    return db.none(addWorkerQuery);
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

// bcrypt.compare('somePassword', hash, function(err, res) {
//     if(res) {
//      // Passwords match
//     } else {
//      // Passwords don't match
//     }
// });
