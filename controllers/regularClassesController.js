const { RegularClasses, Room, Level, Course} = require('../models/models');
const ApiError = require('../error/ApiError');

class RegularClassesController {
    async create(req, res, next) {
        try {
            let { name} = req.body;
            const regularClasses = await RegularClasses.create({ name });
            return res.json(regularClasses);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let regularClasses = await RegularClasses.findAll();
        return res.json(regularClasses, { include:
                [
                    { model: Room },
                    { model: Level },
                    { model: Course }
                ]
        });
    }
}

module.exports = new RegularClassesController();