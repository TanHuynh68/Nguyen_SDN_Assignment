const brandModel = require("../models/brand.model");


class brandService {

    getBrandsService = async (req, res, keyword) => {
        try {
            let response;
            if (!keyword) {
                response = await brandModel.find({});
            } else {
                const regex = new RegExp(keyword, 'i');
                response = await brandModel.find({ brandName: { $regex: regex } });
            }
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    createBrandService = async (req, res, brandName) => {
        try {
            const response = await brandModel.create({ brandName: brandName });
            return response
        } catch (error) {
            console.error(error);
        }
    }

    getBrandService = async (req, res, brandName) => {
        try {
            const response = await brandModel.findOne({ brandName: { $regex: new RegExp(`^${brandName}$`, 'i') } });
            return response;
        } catch (error) {
            console.error(error);
            return null; 
        }
    }
    

    getBrandByIdService = async (req, res, id) => {
        try {
            const response = await brandModel.findById({ _id: id });
            return response ? response : null
        } catch (error) {
            console.error(error);
            return null
        }
    }

    editBrandService = async (req, res, id, brandName) => {
        try {
            const response = await brandModel.findByIdAndUpdate({ _id: id }, { brandName: brandName }, { new: true });
            return response
        } catch (error) {
            console.error(error);
        }
    }

    deleteOrResotreService = async (req, res, id) => {
        try {
            const response = await brandModel.deleteOne({_id: id})
            console.log("deleteOrResotreService: ", response)
            if (response)
                return response;
        } catch (error) {
            console.log("error: ", error)
        }
    }
}

module.exports = new brandService();