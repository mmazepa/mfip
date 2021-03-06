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
    return db.any('SELECT e.image, e.first_name, e.last_name, e.birth, e.phone_number, e.email, ' +
            'a.country, a.city, a.street, a.house_number, a.zip_code ' +
            'FROM "Employee" AS e INNER JOIN "Adres" AS a ON e.id_adres = a.id');
};

Employee.findById = (id) => {
    return db.one(
        'SELECT * FROM "Employee" AS "e" ' +
        'WHERE e.id = $1', id);
};

Employee.findByName = (last_name) => {
    return db.any('SELECT * FROM "Employee" AS "e" ' +
        ' WHERE e.last_name = $1', last_name);
};

Employee.findEmployeeByCompanyId = (companyId) => {
    return db.any('SELECT * ' +
        ' FROM "Employee" AS e ' +
        ' INNER JOIN "Work_History" AS wh ON e.id = wh.id_employee' +
        ' INNER JOIN "Adres" AS a ON e.id_adres = a.id' +
        ' WHERE wh.id_workstation = $1', companyId);
};

//hash
Employee.getHashByEmail = (email) => {
    return db.one('SELECT * ' +
        'FROM "Employee" AS "e" ' +
        'WHERE e.email = $1', [email]);
};

Employee.getImage = (id_employee) => {
    return db.one('SELECT c.image ' +
        'FROM "Employee" AS "e" ' +
        'WHERE e.id = $1', [id_employee]);
};

Employee.setNewImage = (id_employee, image) => {
    return db.none('UPDATE "Employee" ' +
                'SET "image"= $2 ' +
                'WHERE id= $1', [id_employee, image]);
};

// update personal info
Employee.updateEmployeePersonals = (newUserPersonals) => {
    return db.none('UPDATE "Employee" SET ' +
                    'first_name=${first_name}, ' +
                    'last_name=${last_name}, ' +
                    'birth=${birth}, ' +
                    'phone_number=${phone_number}, ' +
                    'email=${email} ' +
                    'WHERE id=${id}',
                    newUserPersonals);
};
