/*jshint node: true, esversion: 6 */

const db = require("../config/postgres.js");
const bcrypt = require('bcrypt');
const Employee = module.exports;

// C
Employee.createEmployee = (paramerts_json) => {
    
    paramerts_json.password = bcrypt.hashSync(paramerts_json.password, 10);
    
    return db.tx(transaction => {
        return transaction.one(
            'INSERT INTO "Adres"(country) VALUES(NULL) RETURNING id')
            .then(data => {
                paramerts_json.id_adres = data.id;
                return transaction.one(
                    'INSERT INTO "Employee"(id_adres, password, first_name, last_name, birth, phone_number, email) ' +
                    'VALUES(${id_adres}, ${password}, ${first_name}, ${last_name}, ${birth}, ${phone_number}, ${email}) RETURNING id',
                    paramerts_json);
            });
    });
};

// R
Employee.findAll = () => {
    return db.any('SELECT e.first_name, e.last_name, e.birth, e.phone_number, e.email, ' +
            'a.country, a.city, a.street, a.house_number, a.zip_code ' +
            'FROM "Employee" AS e INNER JOIN "Adres" AS a ON e.id_adres = a.id');
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

//hash
Employee.getHashByEmail = (email) => {
    return db.one('SELECT * ' +
        'FROM "Employee" AS "e" ' +
        'WHERE e.email = $1', [email]);
};
