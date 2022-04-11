const Router = require('express');
const router = new Router();
const taskCategoryController = require('../controllers/taskCategoryController');
const checkRole = require("../middleware/checkRoleMiddleware");


router.post('/',checkRole('ADMIN'), taskCategoryController.create);
router.get('/', checkRole('ADMIN'), taskCategoryController.getAll);

module.exports = router;