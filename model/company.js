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

Company.workers = (id) => {
    return db.any('SELECT e.first_name, e.last_name, e.email,  wh.from, wh.to FROM "Work_History" AS "wh" INNER JOIN "Employee" AS "e" on wh.id_emplyee = e.id WHERE id_company=$1', [id]);
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
