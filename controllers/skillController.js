//jshint node: true, esversion: 6

var skillController = {};
const Skill = require("../model/skill");

skillController.add = (req, res) => {
    let type = req.body.type;
    let name = req.body.name;
    let description = req.body.description;
    Skill.add(type, name, description).then(() => {
        res.redirect("/skills");
    })
    .catch((error) => {
        console.log(error);
    });
};

skillController.remove = (req, res) => {
    let id = req.params.id;
    Skill.remove(id).then(() => {
        res.redirect("/skills");
    })
    .catch((error) => {
        console.log(error);
    });
};

module.exports = skillController;
