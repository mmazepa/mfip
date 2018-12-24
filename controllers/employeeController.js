//jshint node: true, esversion: 6

var employeeController = {};
const Employee = require('../model/employee');

// Employee
// C
employeeController.employeeCreate = (req, res) => {
    Employee.createEmployee(req.body).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

// R
employeeController.employeePassword = (req, res) => {
    Employee.getHashByEmail(req.body.email).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

employeeController.employee = (req, res) => {
    Employee.findAll().then((data) => {
        res.render('crud/workers.ejs', {
            employees: data
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

employeeController.employeeById = (req, res) => {
    let id = req.params.id;
    Employee.findById(id).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

employeeController.employeeByLastName = (req, res) => {
    let last_name = req.params.last_name;
    Employee.findByName(last_name).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

module.exports = employeeController;
