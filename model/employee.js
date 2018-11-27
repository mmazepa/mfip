/*jshint node: true, esversion: 6 */
const pgp = require('pg-promise')();
const db = pgp("postgres://mfip_admin:root@localhost:5432/mfip");

const Employee = module.exports;

// R
module.exports.findAll = () => {
    return db.any('SELECT * FROM "Employee"');
};

module.exports.findById = (id) => {
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

// module.exports.findAllInfoById = (id) => {
//     console.log("AAAAAAAAAAAAAAAAAAAAAAa");
//     return db.any(
//         'SELECT * ' + 
//         'FROM "Employee" AS "e" INNER JOIN "Work_History" AS "wh" ' +
//         'ON wh.id_emplyee = e.id ' + 
//         'WHERE e.id = $1 ', 
//         id);
//     };

module.exports.findByName = (last_name) => {
    return db.any('SELECT * FROM "Employee" AS "e" ' +
        ' WHERE e.last_name = $1', last_name);
};