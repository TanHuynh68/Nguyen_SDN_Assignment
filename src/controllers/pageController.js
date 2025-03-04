
const brandServices = require("../services/brand.services");const memberService = require("../services/member.service");
const perfumeService = require("../services/perfume.service");
;
const { getPerfumesService } = require("../services/perfume.service");

class pageController {
    getAdminPage = async (req, res) => {
        const getPerfumeFromAdmin = await getPerfumesService(req, res);
        const brands = await brandServices.getBrandsService(req, res);
        return res.render("admin", {perfumes: getPerfumeFromAdmin, brands: brands})
    }
    getBrandPage = async (req, res) => {
        const getBrandsService = await brandServices.getBrandsService(req, res);
        return res.render("brand", {brands: getBrandsService})
    }
    getRegisterPage = async (req, res) => {
        return res.render("register")
    }
    getHomePage = async (req, res) => {
        const perfumes = await perfumeService.getPerfumesService(req, res)
        const token = req.cookies.token
        console.log("token: ", token)
        return res.render("index", {perfumes: perfumes, token: token})
    }
    getLoginPage = async (req, res) => {
        return res.render("login")
    }
    getErrorPage = async (req, res) => {
        return res.render("error", {error: req.error})
    }
    getPerfumeDetailPage = async (req, res) => {
        if (!req.cookies || !req.cookies.userData) {
            return res.render('error', { message: "No user data found in cookies!", link: "/change-password" });
        }
        console.log("userDataJson", JSON.parse(req.cookies.userData));
        const userDataJson = JSON.parse(req.cookies.userData);
        console.log("userDataJson._id: ", userDataJson._id)
        const user = await memberService.getMemberDetailService(req, res, userDataJson._id)
        const id = req.params.id;
        console.log("user._id: ", user._id)
        const perfume = await perfumeService.getPerfumeByIdService(req, res, id)
        let hasComment = perfume.comments.filter(item => item.author.email === user.email   );

        console.log("hasComment: ", hasComment)
        console.log("perfume: ", perfume)
        return res.render("perfume_detail", {perfume: perfume, user: user, hasComment: hasComment})
    }
    getAdminManageuserPage = async (req, res) => {
        const members = await memberService.getMembersService(req, res)
        console.log("members: ", members)
        return res.render("admin_manage_user", {members: members})
    }
    getChangePasswordPage = async (req, res) => {
        return res.render("change_password")
    }
    getChangeProfile= async (req, res) => {
        if (!req.cookies || !req.cookies.userData) {
            return res.render('error', { message: "No user data found in cookies!", link: "/change-password" });
        }
        console.log("userDataJson", JSON.parse(req.cookies.userData));
        const userDataJson = JSON.parse(req.cookies.userData);
        console.log("userDataJson._id: ", userDataJson._id)
        const user = await memberService.getMemberDetailService(req, res, userDataJson._id)
        console.log("user: ", user);
        return res.render("change_profile", {user})
    }
}

module.exports = new pageController();