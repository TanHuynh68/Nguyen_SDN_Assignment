
const members = require("../models/member.model");

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const redis = require('redis');
// const showValiDateResult = require("../middlewares/auth.middleware");
const { getMemberService } = require("../services/auth.service");
// const { generateOTP, sendOTP } = require("../services/sms.service");
// const client = redis.createClient();
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRES_IN = process.env.EXPIRES_IN;



class authController {

    register = async (req, res) => {
        // const validationErrors = showValiDateResult(req, res)
        // if (validationErrors) return;
        const { name, password, yob, email, gender } = req.body;
        try {
            const isExsistMember = await getMemberService(req, res, name)
            if (isExsistMember.length > 0) {
                // return res.status(400).json({
                //     message: "memberName is Exsisted",
                //     data: isExsistMember
                // });
               return res.render('error', { message: "Name is Existed", link: "/register" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const response = await members.create({ name: name, password: hashedPassword, email: email, YOB: yob, gender: gender, isAdmin: false });
            console.log("response: ", response)
            if (response) {
                // res.status(201).json({
                //     message: "Create Account Successfully!",
                //     data: response,
                // });
                return res.redirect('/login')
            }
            else {
                // console.log("Create Failed!");
                // res.status(500).send("Internal Server Error");
                return res.render('error', { message: "Internal Server Error", link: "/register" });
            }
        } catch (error) {
            console.error(error);
            // res.status(500).send("An error occurred");
            return   res.render('error', { message: "An error occurred", link: "/register" });
        }
    }



    login = async (req, res) => {
        const { email, password } = req.body;
        // const validationErrors = showValiDateResult(req, res)
        // if (validationErrors) return;
        try {
            const member = await members.findOne({ email: email });
            if (member) {
                const isMatch = await bcrypt.compare(password, member.password);
                if (isMatch) {
                    const token = jwt.sign(
                        { _id: member._id, email: member.email, isAdmin: member.isAdmin },
                        SECRET_KEY,
                        { expiresIn: parseInt(EXPIRES_IN) }
                    );
                    console.log("member: ", member)
                    res.cookie('token', token, { httpOnly: true, secure: true });
                    const userData = {
                        email: member.email,
                        name: member.name,
                        YOB: member.YOB,
                        gender: member.gender,
                        isAdmin: member.isAdmin, // Fixed typo from isAdminm to isAdmin
                        _id: member._id
                    };
                    const userDataString = JSON.stringify(userData);
                    res.cookie('userData', userDataString);

                    // return res.status(200).json({
                    //     message: "Login Successfully!",
                    //     token: token,
                    // });
                    if (member.isAdmin === true) {
                        res.redirect(`/admin`);
                    } else {
                        res.redirect(`/`);
                    }
                }
                else {
                    // console.log("Login Failed: Invalid password");
                    // res.status(401).json({ message: "Password Invalid" });
                    res.render('error', { message: "Password Invalid", link: "/login" });
                }
            } else {
                res.render('error', { message: "User Not Found", link: "/login" });
                // res.status(400).json({ message: "User Not Found" });
            }
        } catch (error) {
            console.error(error);
            res.render('error', { message: "An error occurred", link: "/login" });
            // res.status(500).json({ message: "An error occurred" });
        }
    }

    logout = (req, res) => {
        const cookies = req.cookies;
        console.log("handle logout")
        for (const cookie in cookies) {
            if (cookies.hasOwnProperty(cookie)) {
                res.clearCookie(cookie);
            }
        }

        res.redirect('/login')
    }
}

module.exports = new authController();