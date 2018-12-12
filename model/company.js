/*jshint node: true, esversion: 6 */

const pgp = require('pg-promise')();
const db = pgp("postgres://mfip_admin:root@localhost:5432/mfip");

const bcrypt = require('bcrypt');

const Company = module.exports;

// C
Company.createCompany = (paramerts_json) => {

    paramerts_json.password = bcrypt.hashSync(paramerts_json.password, 15);

    return db.one(
        'INSERT INTO "Company"(password, name, email, specialization, description, website) ' +
        'VALUES(${password}, ${name}, ${email}, ${specialization}, ${description}, ${website}) RETURNING id',
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

//hash
Company.getHashByEmail = (email) => {
    return db.one('SELECT c.password ' +
        'FROM "Company" AS "c" ' +
        'WHERE c.email = $1', [email]);
};



// bcrypt.compare('somePassword', hash, function(err, res) {
//     if(res) {
//      // Passwords match
//     } else {
//      // Passwords don't match
//     }
// });
