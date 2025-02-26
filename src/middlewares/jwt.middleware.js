var jwt = require('jsonwebtoken');
var { jwtDecode } = require('jwt-decode');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRES_IN = process.env.EXPIRES_IN;
class jwtMiddleWare {
    createToken = (data, SECRET_KEY, expiresIn) => {
        const token = jwt.sign(data, SECRET_KEY, {
            expiresIn: expiresIn,
        });
        return token
    }

    isLogin = (req, res, next) => {
        // const authHeader = req.headers['authorization'];
        // const token = authHeader && authHeader.split(' ')[1]; // Lấy token từ header
        const token = req.cookies.token;
        console.log("token: ", token)
        if (token) {
            return res.redirect('/')
        } else {
            next();
        }
    };
    authenticateToken = (req, res, next) => {
        // const authHeader = req.headers['authorization'];
        // const token = authHeader && authHeader.split(' ')[1]; // Lấy token từ header
        const token = req.cookies.token;
        if (token) {
            jwt.verify(token, SECRET_KEY, (err, user) => {
                console.log("err: ", err)
                console.log("token: ", token)
                if (err) {
                    // return res.status(403).json({
                    //     message: 'Invalid token.'
                    // });
                    return res.render('error', { message: "Invalid token.", link: "/" });
                }
                console.log("user: ", user)
                req.user = user;
                next();
            });
        } else {
            // return res.status(401).json({
            //     message: 'Access denied. No token provided.'
            // });

            return res.render('error', { message: "Access denied. No token provided.", link: "/" });
        }
    };

    isAdmin = (req, res, next) => {
        const isAdmin = req.user.isAdmin
    
        if (isAdmin === false) {
            // return res.status(403).json({
            //     message: 'You are not Admin.'
            // });
            return res.render('error', { message: "You are not Admin.", link: "/" });
        } else {
            next();
        }
    };

    isMember = (req, res, next) => {
        const isAdmin= req.user.isAdmin
        if (isAdmin === true) {
            // return res.status(403).json({
            //     message: 'You are not Member.'
            // });
            return res.render('error', { message: "You are not Member.", link: "/admin" });
        } else {
            next();
        }
    };
}

module.exports = new jwtMiddleWare();