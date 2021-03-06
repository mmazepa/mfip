//jshint node: true, esversion: 6

var companyController = {};
const Company = require('../model/company');

const formidable = require('formidable');
const fs = require('fs');

// Company
// C
companyController.companyCreate = (req, res) => {
    Company.createCompany(req.body).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

// R
companyController.companyPassowrd = (req, res) => {
    Company.getHashByEmail(req.body.email).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

companyController.company = (req, res) => {
    Company.findAll().then((data) => {
        res.render('crud/firms.ejs', {
            firms: data
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

companyController.findJob = (req, res) => {
    Company.findAllWithWorkstations()
    .then((data) => {
        res.render('findJob.ejs', {
            jobs: data
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

companyController.companyById = (req, res) => {
    let id = req.params.id;
    Company.findById(id).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

companyController.companyByName = (req, res) => {
    let name = req.params.name;
    Company.findByName(name).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

companyController.imageGet = (req,res) => {
    let id = req.params.id;
// <<<<<<< HEAD
    Company.getImage(id).then((result) => {

        //console.log(result.image.toJSON().data);
        //console.log(Buffer.from(JSON.parse(result.image).data));

        //result.image.toJSON().data
        res.json(
            "data:image/jpeg;base64," + result.image.toString()
        );
// =======
        Company.getImage(id).then((data) => {
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

companyController.imageUpload = (req,res) => {
// <<<<<<< HEAD

// =======
    let form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        let image = fs.readFileSync(files.imagetoupload.path);

        Company.setNewImage(fields.id, new Buffer(image).toString('base64'))
        .then(() => {
            Company.findById(fields.id)
            .then((data) => {
                global.user.image = data.image;
                res.redirect("/firm");
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

companyController.add = (req, res) => {
    let name = req.body.name;
    let specialization = req.body.specialization;
    let description = req.body.description;
    let email = req.body.email;
    let website = req.body.website;
    Company.add(name, specialization, description, email, website)
    .then(() => {
        res.redirect("/company");
    })
    .catch((error) => {
        console.log(error);
    });
};

companyController.addWorkerById = (req, res) => {
    let workstation_id = req.params.workstation_id;
    let employee_id = req.params.employee_id;
    Company.addWorker(workstation_id, employee_id)
    .then(() => {
        res.redirect("/worker");
    })
    .catch((error) => {
        console.log(error);
    });
};

companyController.acceptWorkerById = (req, res) => {
    let workstation_id = req.params.workstation_id;
    let employee_id = req.params.employee_id;
    Company.acceptWorker(workstation_id, employee_id)
    .then(() => {
        res.redirect("/firm");
    })
    .catch((error) => {
        console.log(error);
    });
};

companyController.fireWorkerById = (req, res) => {
    let by = req.params.by;
    let workstation_id = req.params.workstation_id;
    let employee_id = req.params.employee_id;
    Company.fireWorker(workstation_id, employee_id)
    .then(() => {
        if (by == "you") res.redirect("/worker");
        if (by == "boss") res.redirect("/firm");
    })
    .catch((error) => {
        console.log(error);
    });
};

companyController.update = (req, res) => {
    let newFirmInfo = {
        id: req.body.id,
        name: req.body.name,
        specialization: req.body.specialization,
        description: req.body.description,
        email: req.body.email,
        website: req.body.website
    };
    Company.updateFirmInfo(newFirmInfo)
    .then(() => {
        Company.findById(req.body.id)
        .then((data) => {
            global.user = data;
            res.redirect("/firm");
        })
        .catch((error) => {
            console.log(error);
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

companyController.remove = (req, res) => {
    let id = req.params.id;
    Company.remove(id).then(() => {
        res.redirect("/company");
    })
    .catch((error) => {
        console.log(error);
    });
};

module.exports = companyController;
