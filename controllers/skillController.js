//jshint node: true, esversion: 6

var skillController = {};
const Skill = require("../model/skill");
var session;

skillController.skills = (req, res) => {
    session = req.session || session;
    var skills = req.skills || skills;

    Skill.findAll().then((data) => {
        res.render('crud/skills.ejs', {
            session: session,
            skills: data
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

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
