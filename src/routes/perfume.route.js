var express = require('express');
const { API_ROUTE } = require('../const');
const perfumeController = require('../controllers/perfumeController');
const jwtMiddleware = require('../middlewares/jwt.middleware');
var router = express.Router();

router.route(API_ROUTE.CREATE_PERFUME).post(jwtMiddleware.authenticateToken, jwtMiddleware.isAdmin, perfumeController.createPerfume)
router.route(API_ROUTE.EDIT_PERFUME).put(jwtMiddleware.authenticateToken, jwtMiddleware.isAdmin, perfumeController.editPerfume)
router.route(API_ROUTE.DELETE_PERFUME).delete(jwtMiddleware.authenticateToken, jwtMiddleware.isAdmin, perfumeController.deletePerfume)
module.exports = router;
