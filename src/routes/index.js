var express = require('express');
const { PATH } = require('../const');
var router = express.Router();
var pageRoute = require('./page.route');
// var memberRoute = require('./member.route');
var authRoute = require('./auth');
var brandRoute = require('./brand.route');
var perfumeRoute = require('./perfume.route');
var memberRoute = require('./member.route');
/* GET home page. */

router.use('/', pageRoute);
router.use('/auth', authRoute);
router.use('/brand', brandRoute);
router.use('/perfume', perfumeRoute);
router.use('/member', memberRoute);
  
module.exports = router;
