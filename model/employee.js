/*jshint node: true, esversion: 6 */
const pgp = require('pg-promise')();
const db = pgp("postgres://mfip_admin:root@localhost:5432/mfip");

const bcrypt = require('bcrypt');

const Employee = module.exports;

// C
Employee.createEmployee = (paramerts_json) => {
    paramerts_json.password = bcrypt.hashSync(paramerts_json.password, 10);
    return db.one(
        'INSERT INTO "Employee"(password, first_name, last_name, birth, phone_number, email) ' + 
        'VALUES(${password}, ${first_name}, ${last_name}, ${birth}, ${phone_number}, ${email}) RETURNING id',
            paramerts_json);
};

// R
Employee.findAll = () => {
    return db.any('SELECT * FROM "Employee"');
};

Employee.findById = (id) => {
    return db.one(
        'SELECT * FROM "Employee" AS "e" ' + 
        'WHERE e.id = $1', 
        id);
    // return db.any(
    //     'SELECT e.first_name, e.last_name, e.birth, e.phone_number, e.email, ' +
    //     'e.password, a.country, a.city, a.street, a.house_number, a.zip_code, ' +
    //     'c.name AS company_name, c.specialization, wh.from, wh.to, wh.description ' +
    //     'FROM "Work_History" AS "wh" INNER JOIN "Company" AS "c" ' +
    //     'ON wh.id_company = c.id INNER JOIN "Employee" AS "e" ' +
    //     'ON wh.id_emplyee = e.id INNER JOIN "Adres" AS a ' +
    //     'ON e.id_adres = a.id WHERE e.id=$1', [id]);
};

Employee.findByName = (last_name) => {
    return db.any('SELECT * FROM "Employee" AS "e" ' +
        ' WHERE e.last_name = $1', last_name);
};