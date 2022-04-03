const Router = require('express')
const router = new Router()
const teacherController = require('../controllers/teacherController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('ADMIN'), teacherController.create)
router.post('/login', teacherController.login)
router.get('/auth', authMiddleware, teacherController.check)
router.get('/', checkRole('ADMIN'), authMiddleware, teacherController.getAll)
router.get('/:id', checkRole('ADMIN'), authMiddleware, teacherController.getOne)
module.exports = router
