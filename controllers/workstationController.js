//jshint node: true, esversion: 6

var workstationController = {};
const Workstation = require('../model/workstation');

// Workstation
// C
workstationController.workstationCreate = (req, res) => {
    Workstation.createWorkstationByIdCompany(req.body).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

workstationController.workplacesByCompanyId = (req, res) => {
    let id = req.session.passport.user.id;
    Workstation.getAllByCompanyId(id)
    .then((data) => {
        res.render('workplaces.ejs', {
            workplaces: data
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

workstationController.addWorkplace = (req, res) => {
    let company_id = req.body.company_id;
    let workplace = req.body.workplace;
    let phone_number = req.body.phone_number;
    let email = req.body.email;
    let description = req.body.description;
    Workstation.add(company_id, workplace, phone_number, email, description)
    .then(() => {
        res.redirect("/workplaces");
    })
    .catch((error) => {
        console.log(error);
    });
};

module.exports = workstationController;
