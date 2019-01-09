/*jshint node: true, esversion: 6 */

const db = require("../config/postgres.js");
const Skill = module.exports;

Skill.findAll = () => {
    return db.any('SELECT * FROM "Skill" ORDER BY type, name, description');
};

Skill.findById = (id) => {
    return db.one('SELECT * FROM "Skill" WHERE id = $1', id);
};

Skill.add = (type, from, to, name, description) => {
    let addQuery = 'INSERT INTO "Skill" (type, "from", "to", name, description) ' +
                        'VALUES (\'' + type + '\', \'' + from + '\', \'' + to + '\', \'' + name + '\', \'' + description + '\') ' +
                        'RETURNING id';
    if (from == undefined && to == undefined) {
        addQuery = 'INSERT INTO "Skill" (type, "from", "to", name, description) ' +
                    'VALUES (\'' + type + '\', NULL, NULL, \'' + name + '\', \'' + description + '\') ' +
                    'RETURNING id';
    } else if (from == undefined) {
        addQuery = 'INSERT INTO "Skill" (type, "from", "to", name, description) ' +
                    'VALUES (\'' + type + '\', NULL, \'' + to + '\', \'' + name + '\', \'' + description + '\') ' +
                    'RETURNING id';
    } else if (to == undefined) {
        addQuery = 'INSERT INTO "Skill" (type, "from", "to", name, description) ' +
                    'VALUES (\'' + type + '\', \'' + from + '\', NULL, \'' + name + '\', \'' + description + '\') ' +
                    'RETURNING id';
    }
    return db.one(addQuery);
};

Skill.addByUser = (type, from, to, name, description) => {
    let addQuery = 'INSERT INTO "Skill" (type, "from", "to", name, description) ' +
                        'VALUES (\'' + type + '\', \'' + from + '\', \'' + to + '\', \'' + name + '\', \'' + description + '\') ' +
                        'RETURNING id';
    if (from == undefined && to == undefined) {
        addQuery = 'INSERT INTO "Skill" (type, "from", "to", name, description) ' +
                    'VALUES (\'' + type + '\', NULL, NULL, \'' + name + '\', \'' + description + '\') ' +
                    'RETURNING id';
    } else if (from == undefined) {
        addQuery = 'INSERT INTO "Skill" (type, "from", "to", name, description) ' +
                    'VALUES (\'' + type + '\', NULL, \'' + to + '\', \'' + name + '\', \'' + description + '\') ' +
                    'RETURNING id';
    } else if (to == undefined) {
        addQuery = 'INSERT INTO "Skill" (type, "from", "to", name, description) ' +
                    'VALUES (\'' + type + '\', \'' + from + '\', NULL, \'' + name + '\', \'' + description + '\') ' +
                    'RETURNING id';
    }
    return db.one(addQuery);
};

Skill.addToListSkills = (user_id, skill_id) => {
    let addQuery = 'INSERT INTO "List_Skills" ' +
                    '(id_skill, id_owner, is_company) ' +
                    'VALUES (' + skill_id + ',' + user_id + ',false)';
    return db.none(addQuery);
};

Skill.remove = (id) => {
    const removeQuery = 'DELETE FROM "Skill" WHERE id=' + id;
    return db.result(removeQuery);
};
