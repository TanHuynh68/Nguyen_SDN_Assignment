
const { deleteOrResotreService, getBrandsService, getBrandByIdService, getBrandService, createBrandService, editBrandService } = require("../services/brand.services");

class brandController {
    getAllBrand = async (req, res) => {
        try {
            const { keyword } = req.body
            const response = await getBrandsService(req, res)
            if (response) {
                return res.status(200).json({
                    message: "Get Brands Successfully!",
                    data: response
                })
            }
        } catch (error) {
            // return res.status(500).json({
            //     message: "Internal Server Error!",
            // })
        }

    }

    getBrand = async (req, res) => {
        try {
            const { id } = req.params
            const response = await getBrandByIdService(req, res, id)
            if (response) {
                return res.status(200).json({
                    message: "Get Brands Successfully!",
                    data: response
                })
            } else {
                return res.status(404).json({
                    message: "Brand or Id is not existed!",
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error!",
            })
        }

    }

    createBrand = async (req, res, next) => {
        const { brandName } = req.body;
        console.log("brandName: ", brandName)
        if (!brandName) {
            // return res.status(400).json({ message: "brandName is required!" });
            return res.render('error', { message: "brandName is required!", link: "/brand" });
        }
        const responseFindOneBrand = await getBrandService(req, res, brandName)
        if (responseFindOneBrand) {
            // return res.status(400).json({
            //     message: "Brand Existed",
            //     data: responseFindOneBrand
            // })
            return res.render('error', { message: "Brand Existed", link: "/brand" });
        }
        const response = await createBrandService(req, res, brandName)
        if (response) {
            // return res.status(201).json({
            //     message: "Create New Brand Successfully",
            //     data: response
            // })
            return res.redirect('/brand')
        }
    }

    editBrand = async (req, res) => {
        try {
            const { id } = req.params;
            const { brandName } = req.body;
            console.log("brandName: ", brandName)
            if (!brandName) {
                // return res.status(400).json({ message: MESSAGE.BRANDNAME_IS_REQUIRED });
                return res.render('error', { message: "brandName is required!", link: "/brand" });
            }
            const response = await getBrandByIdService(req, res, id);
            if (!response) {
                // return res.status(404).json({
                //     message: MESSAGE.BRAND_OR_ID_IS_NOT_EXSISTED,
                // });
                return res.render('error', { message: "Brand is not Existed", link: "/brand" });
            }
            if (brandName.toLowerCase() === response.brandName.toLowerCase()) {
                const edit = await editBrandService(req, res, id, brandName);
                // return res.status(200).json({
                //     message: MESSAGE.EDIT_BRANDNAME_SUCCESSFULLY,
                //     data: edit,
                // });
                return res.redirect(303, '/brand');
            }
            const isBrandNameExsisted = await getBrandService(req, res, brandName);
            if (isBrandNameExsisted) {
                // return res.status(400).json({
                //     message: MESSAGE.EDIT_BRANDNAME_FAILED,
                // });
                return res.render('error', { message: "Brand Name is Existed", link: "/brand" });
            }
            const edit = await editBrandService(req, res, id, brandName);
            // return res.status(200).json({
            //     message: MESSAGE.EDIT_BRANDNAME_SUCCESSFULLY,
            //     data: edit,
            // });
            return res.redirect(303, '/brand');
        } catch (error) {
            console.error(error);
            // return res.status(500).json({
            //     message: MESSAGE.INTERNAL_SERVER_ERROR,
            // });
            return res.render('error', { message: "INTERNAL_SERVER_ERROR", link: "/brand" });
        }
    };

    deleteBrand = async (req, res) => {
        try {
            const { id } = req.params
            console.log("id: ", id)
            const response = await deleteOrResotreService(req, res, id, true);
            console.log("deleteBrand: ", response)
            if (response) {
                // res.status(200).json({
                //     message: "Delete Watch Successfully",
                //     data: response
                // });
                return res.redirect(303, '/brand');
            } else {
                // return res.status(404).json({
                //     message: "User not found or id is not exsist!",
                // });
                return res.render('error', { message: "Brand not found or id is not exsist!", link: "/brand" });
            }
        } catch (error) {
            // return res.status(500).json({
            //     message: "An error occurred",
            // });
            return res.render('error', { message: "An error occurred!", link: "/brand" });
        }
    }

    restoreBrand = async (req, res) => {
        try {
            const { id } = req.params
            const response = await deleteOrResotreService(req, res, id, false);
            if (response) {
                res.status(200).json({
                    message: "Delete Watch Successfully",
                    data: response
                });
            } else {
                return res.status(404).json({
                    message: "User not found or id is not exsist!",
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: "An error occurred",
            });
        }
    }
}

module.exports = new brandController();
