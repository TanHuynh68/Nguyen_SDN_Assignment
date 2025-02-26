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
}

module.exports = new authService();