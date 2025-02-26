var express = require('express');
const { PATH } = require('../const');
var router = express.Router();
var pageRoute = require('./page.route');
// var memberRoute = require('./member.route');
var authRoute = require('./auth');
/* GET home page. */

router.use('/', pageRoute);
router.use('/auth', authRoute);
module.exports = router;
