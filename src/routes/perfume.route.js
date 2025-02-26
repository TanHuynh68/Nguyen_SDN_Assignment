var express = require('express');
const watchController = require('../controllers/watchController');
const validateWatch = require('../middleware/watch.middleware');
const { API_ROUTE } = require('../const');
const jwtMiddleware = require('../middleware/jwt.middleware');
var router = express.Router();

router.route(API_ROUTE.CREATE_WATCH).post(jwtMiddleware.authenticateToken, jwtMiddleware.isAdmin, watchController.createWatch)
module.exports = router;
