//jshint node: true, esversion: 6

var skillController = {};
const Skill = require("../model/skill");

skillController.skills = (req, res) => {
    var skills = req.skills || skills;

    Skill.findAll().then((data) => {
        res.render('crud/skills.ejs', {
            skills: data
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

skillController.add = (req, res) => {
    let type = req.body.type;
    let from = req.body.from;
    let to = req.body.to;
    let name = req.body.name;
    let description = req.body.description;

    switch(type) {
        case "exp":
            type = "Experience";
            break;
        case "edu":
            type = "Education";
            break;
        case "lang":
            type = "Language";
            break;
        case "skill":
            type = "Skill";
            break;
        case "course":
            type = "Course";
            break;
        case "cert":
            type = "Certificate";
            break;
        case "int":
            type = "Interest";
            break;
        default:
            // default: do nothing...
            break;
    }

    Skill.add(type, from, to, name, description).then(() => {
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

skillController.addByUser = (req, res) => {
    let user_id = req.params.id;
    let type = req.body.type;
    let from = req.body.from;
    let to = req.body.to;
    let name = req.body.name;
    let description = req.body.description;

    Skill.addByUser(type, from, to, name, description)
    .then((data) => {
        let skill = data;
        Skill.addToListSkills(user_id, skill.id)
        .then(() => {
            res.redirect("/cv");
        })
        .catch((error) => {
            console.log(error);
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

module.exports = skillController;
