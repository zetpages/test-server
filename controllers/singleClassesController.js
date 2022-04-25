const { RegularClasses, Room, Course, CourseType, SingleClass } = require('../models/models');

class SingleClassesController {

    async getAll(req, res) {
        let singleClasses = await SingleClass.findAll({ include:
                [
                    { model: Room },
                    { model: Course },
                    { model: CourseType },
                    { model: RegularClasses }
                    // { model: Group }
                ]
        });
        return res.json(singleClasses);
    }
}

module.exports = new SingleClassesController();