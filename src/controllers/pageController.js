
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
        const id = req.params.id;
        const perfume = await perfumeService.getPerfumeByIdService(req, res, id)
        console.log("perfume: ", perfume)
        return res.render("perfume_detail", {perfume: perfume})
    }
    getAdminManageuserPage = async (req, res) => {
        const members = await memberService.getMembersService(req, res)
        console.log("members: ", members)
        return res.render("admin_manage_user", {members: members})
    }
}

module.exports = new pageController();