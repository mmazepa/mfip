/*jshint node: true, esversion: 6 */
const pgp = require('pg-promise')();
const db = pgp("postgres://mfip_admin:root@localhost:5432/mfip");

const Company = module.exports;

module.exports.createCompany = (paramerts_json) => {
    //console.log(paramerts_json);
    

};

// R
module.exports.findAll = () => {
    return db.any('SELECT * FROM "Company" AS "c"', [true]);
};

module.exports.findByName = (name) => {
    return db.one('SELECT c.id, c.name, c.email, c.specialization, c.description, c.website, c.image ' +
        'FROM "Company" AS "c" ' +
        'WHERE c.name = $1', [name]);
};

module.exports.findById = (id) => {
    return db.one('SELECT c.id, c.name, c.email, c.specialization, c.description, c.website, c.image ' +
        'FROM "Company" AS "c" ' +
        'WHERE c.id = $1', [id]);
};



module.exports.findAllWithAdres = () => {
    return db.any(' SELECT * FROM "Company" AS "c" ', [true]);
};



