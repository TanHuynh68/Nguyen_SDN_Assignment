const perfumeModel = require("../models/perfume.model");

class perfumeService {

    getPerfumesService = async (req, res) => {
        try {
            let response;
            response = await perfumeModel.find({}).populate('brand')
            // Population of brand
            // if (!keyword) {
            //     response = await perfumeModel.find({})
            //     .populate('brand') // Population of brand
            //     .populate({
            //         path: 'comments.author', // Population of author in comments
            //     });
            // }
            // else {
            //     const regex = new RegExp(keyword, 'i');
            //     response = await perfumeModel.find({ perfumeName: { $regex: regex } }).populate('brand') // Population of brand
            //         .populate({
            //             path: 'comments.author', // Population of author in comments
            //         });
            // }
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    getPerfumesByClientService = async (req, res, keyword) => {
        try {
            let response;
            if (!keyword) {
                response = await perfumeModel.find({ is_delete: false }).populate('brand').populate({
                    path: 'comments.author', // Population of author in comments
                });
            } else {
                const regex = new RegExp(keyword, 'i');
                response = await perfumeModel.find({ perfumeName: { $regex: regex }, is_delete: false }).populate('brand').populate({
                    path: 'comments.author', // Population of author in comments
                });
            }
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    createPerfumeService = async (req, res, perfumeName, uri, price, concentration, description, ingredients, volume, targetAudience, brand) => {
        try {
            const response = await perfumeModel.create({
                perfumeName: perfumeName,
                uri: uri,
                price: price,
                concentration: concentration,
                description: description,
                ingredients: ingredients,
                volume: volume,
                targetAudience: targetAudience,
                brand: brand
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    getPerfumeByNameService = async (req, res, perfumeName) => {
        try {
            const response = await perfumeModel.findOne({ perfumeName: perfumeName });
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    getPerfumeByIdService = async (req, res, id) => {
        try {
            const response = await perfumeModel.findById(id)
                .populate('brand') // Populating the brand field
                .populate({
                    path: 'comments.author', // Population of author in comments
                });
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    editPerfumeService = async (req, res, id, perfumeName, uri, price, concentration, description, ingredients, volume, targetAudience, brand) => {
        try {
            const response = await perfumeModel.findOneAndUpdate({ _id: id }, {
                perfumeName: perfumeName,
                uri: uri,
                price: price,
                concentration: concentration,
                description: description,
                ingredients: ingredients,
                volume: volume,
                targetAudience: targetAudience,
                brand: brand
            }, { new: true });
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    deleteOrRestoreService = async (req, res, id) => {
        try {
            const response = await perfumeModel.deleteOne({_id: id});
            console.log("deleteOrRestoreService: ", response);
            if (response)
                return response;
        } catch (error) {
            console.log("error: ", error);
        }
    }
}

module.exports = new perfumeService();