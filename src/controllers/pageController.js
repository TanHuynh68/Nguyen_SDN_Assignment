
const brandServices = require("../services/brand.services");;
const { getPerfumesService } = require("../services/perfume.service");

class pageController {
    getAdminPage = async (req, res) => {
        const getPerfumeFromAdmin = await getPerfumesService(req, res);
        return res.render("admin", {perfumes: getPerfumeFromAdmin})
    }
    getBrandPage = async (req, res) => {
        const getBrandsService = await brandServices.getBrandsService(req, res);
        return res.render("brand", {brands: getBrandsService})
    }
    getRegisterPage = async (req, res) => {
        return res.render("register")
    }
    getHomePage = async (req, res) => {
        return res.render("index")
    }
    getLoginPage = async (req, res) => {
        return res.render("login")
    }
    getErrorPage = async (req, res) => {
        return res.render("error", {error: req.error})
    }
}

module.exports = new pageController();