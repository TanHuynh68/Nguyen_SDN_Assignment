const memberModel = require("../models/member.model");

class authService {
    getMemberService = async (req, res, name) => {
        try {
            const response = await memberModel.find({ name: name });
            return response
        } catch (error) {
            console.error(error);
            return res.render('error', { message: error, link: "/" });
        }
    }

    getMemberServiceById = async (req, res, _id) => {
        console.log("getMemberServiceById: ", _id)
        try {
            const response = await memberModel.findById({_id: _id});
            return response
        } catch (error) {
            console.error(error);
            return res.render('error', { message: error, link: "/" });
        }
    }

    changePasswordService = async (req, res, _id, hashedPassword) => {
        try {
            const response = await memberModel.findByIdAndUpdate(_id, { $set: { password: hashedPassword } }, { new: true })
            console.log("changePasswordService: ", response)
            if (response)
                return response;
        } catch (error) {
            console.log("error: ", error)
        }
    }

}

module.exports = new authService();