var express = require('express');
const { API_ROUTE } = require('../const');
const memberController = require('../controllers/memberController');
const jwtMiddleware = require('../middlewares/jwt.middleware');
var router = express.Router();

// router.route(API_ROUTE.GET_ALL_MEMBER).post(jwtMiddleware.authenticateToken,jwtMiddleware.isAdmin, memberController.getAllMembers)
// router.route(API_ROUTE.GET_MEMBER_DETAIL).get(memberMiddleware.validateIdFromParam, memberController.getMemberDetail)
// router.route(API_ROUTE.CHANGE_PASSWORD).put(memberMiddleware.changePassword, memberController.changePassword)
// router.route(API_ROUTE.DELETE_MEMBER).put(jwtMiddleware.authenticateToken,jwtMiddleware.isAdmin,memberMiddleware.banOrUnBanMember, memberController.deleteMember)
// router.route(API_ROUTE.RESTORE_MEMBER).put(jwtMiddleware.authenticateToken,jwtMiddleware.isAdmin,memberMiddleware.banOrUnBanMember, memberController.restoreMember)
// router.route(API_ROUTE.EDIT_MEMBER).put(jwtMiddleware.authenticateToken,memberMiddleware.editMember, memberController.editMember)
// router.route(API_ROUTE.COMMENT_WATCH).post(jwtMiddleware.authenticateToken,jwtMiddleware.isMember,memberMiddleware.commentWatch, memberController.commentWatch)
router.route(API_ROUTE.CHANGE_PROFILE).post(jwtMiddleware.authenticateToken, memberController.editMember)
module.exports = router;
