/*jshint node: true, esversion: 6 */

const db = require("../config/postgres.js");
const Skill = module.exports;

Skill.findAll = () => {
    return db.any('SELECT * FROM "Skill" ORDER BY type, name, description');
};

Skill.findById = (id) => {
    return db.one('SELECT * FROM "Skill" WHERE id = $1', id);
};

Skill.add = (type, name, description) => {
    const addQuery = 'INSERT INTO "Skill" (type, name, description) ' +
                        'VALUES (\'' + type + '\', \'' + name + '\', \'' + description + '\') ' +
                        'RETURNING id';
    return db.one(addQuery);
};

Skill.remove = (id) => {
    const removeQuery = 'DELETE FROM "Skill" WHERE id=' + id;
    return db.result(removeQuery);
};
