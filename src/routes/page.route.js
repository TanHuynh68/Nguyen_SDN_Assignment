var express = require('express');
const { PATH } = require('../const');
const pageController = require('../controllers/pageController');
const jwtMiddleware = require('../middlewares/jwt.middleware');
var router = express.Router();

/* GET page. */

router.route(PATH.ADMIN_PAGE).get(jwtMiddleware.authenticateToken, jwtMiddleware.isAdmin,pageController.getAdminPage)
router.route(PATH.REGISTER).get(jwtMiddleware.isLogin,pageController.getRegisterPage)
router.route(PATH.HOME_PAGE).get(pageController.getHomePage)
router.route(PATH.LOGIN_PAGE).get(jwtMiddleware.isLogin,pageController.getLoginPage)
router.route(PATH.ADMIN_BRAND_PAGE).get(jwtMiddleware.authenticateToken, jwtMiddleware.isAdmin,pageController.getBrandPage)
module.exports = router;
