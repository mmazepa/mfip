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
