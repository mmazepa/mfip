/*jshint node: true, esversion: 6 */
const pgp = require('pg-promise')();
const db = pgp("postgres://mfip_admin:root@localhost:5432/mfip");

const Workstation = module.exports;


Workstation.findAll = () => {
    return db.any('SELECT * FROM "Workstation"');
};

Workstation.findById = (id) => {
    return db.one(
        'SELECT * FROM "Workstation" AS "w" ' + 
        'WHERE w.id = $1', 
        id);
};

