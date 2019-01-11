//jshint node: true, esversion: 6

var employeeController = {};
const Employee = require('../model/employee');

const formidable = require('formidable');
const fs = require('fs');

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
    Employee.findEmployeeByCompanyId(req.session.passport.user.id).then((data) => {
        res.render('crud/workers.ejs', {
            employees: data
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

employeeController.findAllEmployees = (req, res) => {
    Employee.findAll()
    .then((data) => {
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

employeeController.updateEmployee = (req, res) => {
    let newUserPersonals = {
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birth: req.body.birth,
        phone_number: req.body.phone_number,
        email: req.body.email
    };
    Employee.updateEmployeePersonals(newUserPersonals)
    .then(() => {
        res.redirect("/worker");
    })
    .catch((error) => {
        console.log(error);
    });
};

employeeController.imageGet = (req,res) => {
    let id = req.params.id;
// <<<<<<< HEAD
    Employee.getImage(id).then((result) => {

        //console.log(result.image.toJSON().data);
        //console.log(Buffer.from(JSON.parse(result.image).data));

        //result.image.toJSON().data
        res.json(
            "data:image/jpeg;base64," + result.image.toString()
        );
// =======
        Employee.getImage(id).then((data) => {
            res.json({
                "image_src":"data:image/jpeg;base64," + data.image.toString()
            });
// >>>>>>> a2470300914623103ba53e10e261f158fedc6d2d
        })
        .catch((error) => {
            console.log(error);
            res.json(null);
        });
    });
};

employeeController.imageUpload = (req,res) => {
// <<<<<<< HEAD

// =======
    let form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        let image = fs.readFileSync(files.imagetoupload.path);

        Employee.setNewImage(fields.id, new Buffer(image).toString('base64'))
        .then(() => {
            Employee.findById(fields.id)
            .then((data) => {
                global.user.image = data.image;
                res.redirect("/worker");
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log(error);
            res.redirect("/");
        });
    });

// >>>>>>> a2470300914623103ba53e10e261f158fedc6d2d
};

module.exports = employeeController;
