/*jshint node: true, esversion: 6 */

const db = require("../config/postgres.js");
const Workstation = module.exports;

// C
Workstation.createWorkstationByIdCompany = (paramerts_json) => {
    console.log(paramerts_json);
    return db.one(
        'INSERT INTO "Workstation"(id_company, name, phone_number, email, "limit", description) ' +
        'VALUES(${id_company}, ${name}, ${phone_number}, ${email}, ${limit}, ${description}) RETURNING id',
            paramerts_json);
};

// R
Workstation.findAll = () => {
    return db.any('SELECT * FROM "Workstation"');
};

Workstation.findById = (id) => {
    return db.one(
        'SELECT * FROM "Workstation" AS "w" ' +
        'WHERE w.id = $1', id);
};

Workstation.getAllByCompanyId = (id) => {
    const selectQuery = 'SELECT w.id, c.name AS company, w.name AS workstation, ' +
                        'w.phone_number, w.email, w.description ' +
                        'FROM "Workstation" AS w ' +
                        'INNER JOIN "Company" AS c ON w.id_company=c.id ' +
                        'WHERE c.id=' + id;
    return db.any(selectQuery);
};

Workstation.add = (company_id, workplace, phone_number, email, description) => {
    const insertQuery = 'INSERT INTO "Workstation" ' +
                        '(id_company, name, phone_number, email, description) ' +
                        'VALUES ' +
                        '(' + company_id + ', ' +
                        '\'' + workplace + '\', ' +
                        '' + phone_number + ', ' +
                        '\'' + email + '\', '+
                        '\'' + description + '\')';
    console.log(insertQuery);
    return db.none(insertQuery);
};
