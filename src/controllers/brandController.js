
const { createBrandService, getBrandService, getBrandsService, getBrandByIdService, editBrandService, deleteOrResotreService } = require("../../../SDN-ASSIGNMENT/services/brand.services");

class brandController {
    getAllBrand = async (req, res) => {
        try {
            const { keyword } = req.body
            const response = await getBrandsService(req, res, keyword)
            if (response) {
                return res.status(200).json({
                    message: "Get Brands Successfully!",
                    data: response
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error!",
            })
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
        if (!brandName) {
            return res.status(400).json({ message: "brandName is required!" });
        }
        const responseFindOneBrand = await getBrandService(req, res, brandName)
        if (responseFindOneBrand) {
            return res.status(400).json({
                message: "Brand Existed",
                data: responseFindOneBrand
            })
        }
        const response = await createBrandService(req, res, brandName)
        if (response) {
            return res.status(201).json({
                message: "Create New Brand Successfully",
                data: response
            })
        }
    }

    editBrand = async (req, res) => {
        try {
            const { id } = req.params;
            const { brandName } = req.body;
            if (!brandName) {
                return res.status(400).json({ message: MESSAGE.BRANDNAME_IS_REQUIRED });
            }
            const response = await getBrandByIdService(req, res, id);
            if (!response) {  
                return res.status(404).json({
                    message: MESSAGE.BRAND_OR_ID_IS_NOT_EXSISTED,
                });
            }
            if (brandName.toLowerCase() === response.brandName.toLowerCase()) {
                const edit = await editBrandService(req, res, id, brandName);
                return res.status(200).json({
                    message: MESSAGE.EDIT_BRANDNAME_SUCCESSFULLY,
                    data: edit,
                });
            }
            const isBrandNameExsisted = await getBrandService(req, res, brandName);
            if (isBrandNameExsisted) {
                return res.status(400).json({
                    message: MESSAGE.EDIT_BRANDNAME_FAILED,
                });
            }
            const edit = await editBrandService(req, res, id, brandName);
            return res.status(200).json({
                message: MESSAGE.EDIT_BRANDNAME_SUCCESSFULLY,
                data: edit,
            });
        } catch (error) {
            console.error(error); 
            return res.status(500).json({
                message: MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    };
    
    deleteBrand= async (req, res) => {
        try {
            const { id } = req.params
            const response = await deleteOrResotreService(req, res, id, true);
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
