var express = require('express');

const { PATH, API_ROUTE } = require('../const');
const brandController = require('../controllers/brandController');
const jwtMiddleware = require('../middleware/jwt.middleware');
var router = express.Router();

router.route(API_ROUTE.CREATE_BRAND).post(jwtMiddleware.authenticateToken,jwtMiddleware.isAdmin,brandController.createBrand)
router.route(API_ROUTE.GET_ALL_BRANDS).post(brandController.getAllBrand)
router.route(API_ROUTE.GET_BRAND).get(brandController.getBrand)
router.route(API_ROUTE.EDIT_BRAND).put(jwtMiddleware.authenticateToken,jwtMiddleware.isAdmin,brandController.editBrand)

module.exports = router;
