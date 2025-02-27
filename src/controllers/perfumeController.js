const { MESSAGE } = require("../const");
const {
    getPerfumesService,
    createPerfumeService,
    editPerfumeService,
    deleteOrRestoreService,
    getPerfumeByNameService,
    getPerfumeByIdService,
    getPerfumesByClientService
} = require("../services/perfume.service");
const { validationResult } = require('express-validator');

class perfumeController {

    getPerfumes = async (req, res) => {
        const { keyword } = req.body;
        try {
            const response = await getPerfumesService(req, res, keyword);
            if (response) {
                return res.status(200).json({
                    message: "Get Perfumes Successfully!",
                    dataCount: response.length,
                    data: response
                });
            }
        } catch (error) {
            console.log("getPerfumes-error: ", error);
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }

    getPerfumesByClient = async (req, res) => {
        const { keyword } = req.body;
        try {
            const response = await getPerfumesByClientService(req, res, keyword);
            console.log("length: ", response.length);
            if (response) {
                return res.status(200).json({
                    message: "Get Perfumes Successfully!",
                    dataCount: response.length,
                    data: response
                });
            }
        } catch (error) {
            console.log("getPerfumesByClient-error: ", error);
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }

    getPerfume = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await getPerfumeByIdService(req, res, id);
            if (response) {
                return res.status(200).json({
                    message: "Get Perfume Successfully!",
                    data: response
                });
            } else if (response === undefined) {
                return res.status(404).json({
                    message: "Perfume not found or id does not exist!",
                });
            }
        } catch (error) {
            console.log("getPerfume-error: ", error);
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }

    createPerfume = async (req, res, next) => {
        try {
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({
            //         message: "Validation errors",
            //         errors: errors.array().map(err => ({
            //             field: err.param,
            //             message: err.msg
            //         }))
            //     });
            // }
            const { perfumeName, uri, price, concentration, description, ingredients, volume, targetAudience, brand } = req.body;
            const responseFindOnePerfume = await getPerfumeByNameService(req, res, perfumeName);
            console.log("createPerfume: ", responseFindOnePerfume)
            if (responseFindOnePerfume) {
                // return res.status(400).json({
                //     message: "Perfume Exists",
                //     data: responseFindOnePerfume
                // });
                return res.render('error', { message: "Perfume Exists", link: "/admin" });
            }
            const response = await createPerfumeService(req, res, perfumeName, uri, price, concentration, description, ingredients, volume, targetAudience, brand);
            if (response) {
                // return res.status(201).json({
                //     message: "Create New Perfume Successfully",
                //     data: response
                // });
                return res.redirect('/admin')
            }
        } catch (error) {
            console.log("createPerfume-error: ", error);
            // return res.status(500).json({
            //     message: "Internal Server Error",
            // });
            return res.render('error', { message: "Internal Server Error", link: "/admin" });
        }
    }

    editPerfume = async (req, res, next) => {
        try {
            // const validationErrors = showValiDateResult(req, res);
            // if (validationErrors) return;
            const { id } = req.params;
            const { perfumeName, uri, price, concentration, description, ingredients, volume, targetAudience, brand } = req.body;
            const response = await editPerfumeService(req, res, id, perfumeName, uri, price, concentration, description, ingredients, volume, targetAudience, brand);
            console.log("editPerfume: ", response)
            if (response === undefined || response === null) {
                // return res.status(404).json({
                //     message: "Perfume not found or id does not exist!",
                // });
                return res.render('error', { message: "Perfume not found or id does not exist!", link: "/admin" });
            }
         
            if (response) {
                // return res.status(200).json({
                //     message: "Edit Perfume Successfully",
                //     data: response
                // });
                return res.redirect(303,'/admin');
            }  
        } catch (error) {
            console.log("editPerfume-error: ", error);
            // return res.status(500).json({
            //     message: "Internal Server Error",
            // });
            return res.render('error', { message: "Internal Server Error", link: "/admin" });
        }
    }

    deletePerfume = async (req, res) => {
        try {
            const { id } = req.params;
            console.log("deletePerfume_id: ", id)
            const response = await deleteOrRestoreService(req, res, id, true);
            console.log("deletePerfume_response: ", response)
            if (response) {
                // res.status(200).json({
                //     message: MESSAGE.DELETE_SUCCESSFULLY,
                //     data: response
                // });
                return res.redirect(303, '/admin');
            } else {
                // return res.status(404).json({
                //     message: MESSAGE.PERFUME_NOT_FOUND,
                // });
                return res.render('error', { message: MESSAGE.PERFUME_NOT_FOUND, link: "/admin" });
            }
        } catch (error) {
            // return res.status(500).json({
            //     message: MESSAGE.INTERNAL_SERVER_ERROR,
            // });
            return res.render('error', { message: "Internal Server Error", link: "/admin" });
        }
    }

    restorePerfume = async (req, res) => {
        try {
            const { id } = req.params;
            const response = await deleteOrRestoreService(req, res, id, false);
            if (response) {
                res.status(200).json({
                    message: MESSAGE.RESTORE_SUCCESSFULLY,
                    data: response
                });
            } else {
                return res.status(404).json({
                    message: MESSAGE.PERFUME_NOT_FOUND,
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}

module.exports = new perfumeController();