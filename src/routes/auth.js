var express = require('express');
const authController = require('../controllers/authController');
const { PATH } = require('../const');
const jwtMiddleware = require('../middlewares/jwt.middleware');
// const authMiddleWare = require('../middleware/auth.middleware');
var router = express.Router();
router.route(PATH.REGISTER).post(authController.register)
router.route(PATH.LOGIN).post(authController.login)
router.route(PATH.LOGOUT).post(authController.logout)

module.exports = router;
