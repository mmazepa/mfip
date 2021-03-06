/*jshint node: true, esversion: 6 */

const db = require("../config/postgres.js");
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

Adres.add = (country, city, street, house_number, zip_code) => {
    const addQuery = 'INSERT INTO "Adres" (country, city, street, house_number, zip_code) ' +
                        'VALUES (\'' + country + '\', \'' + city + '\', \'' + street + '\', \'' + house_number + '\', \'' + zip_code + '\') ' +
                        'RETURNING id';
    return db.one(addQuery);
};

// update adres
Adres.update = (newUserAdres) => {
    console.log(JSON.stringify(newUserAdres));
    return db.none('UPDATE "Adres" SET ' +
                    'country=${country}, ' +
                    'city=${city}, ' +
                    'street=${street}, ' +
                    'house_number=${house_number}, ' +
                    'zip_code=${zip_code} ' +
                    'WHERE id=${adres_id}',
                    newUserAdres);
};

Adres.remove = (id) => {
    const removeQuery = 'DELETE FROM "Adres" WHERE id=' + id;
    return db.result(removeQuery);
};
