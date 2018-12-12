/*jshint node: true, esversion: 6 */

const pgp = require('pg-promise')();
const db = pgp("postgres://mfip_admin:root@localhost:5432/mfip");

const Adres = module.exports;

Adres.findAll = () => {
    return db.any('SELECT * FROM "Adres" ORDER BY country, city, street');
};

Adres.findById = (id) => {
    return db.one(
        'SELECT * FROM "Adres" AS "a" ' +
        'WHERE a.id = $1 ' +
        'ORDER BY country, city, street',
        id);
};

Adres.findByCountry = (country) => {
    return db.any(
        'SELECT * FROM "Adres" AS "a" ' +
        'WHERE a.country = $1 ' +
        'ORDER BY country, city, street',
        country);
};
