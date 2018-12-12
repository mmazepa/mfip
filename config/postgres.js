//jshint node: true, esversion: 6

const pgp = require('pg-promise')();
const db = pgp("postgres://mfip_admin:root@localhost:5432/mfip");

module.exports = db;
