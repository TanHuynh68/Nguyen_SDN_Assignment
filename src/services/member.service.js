const memberModel = require("../models/member.model");

class memberService {
    getMembersService = async (req, res, keyword) => {
        try {
            let response;
            if (!keyword) {  // Nếu keyword là rỗng hoặc không được cung cấp
                response = await memberModel.find({isAdmin: false});
            } else {
                // Tìm các memberName hoặc name chứa keyword bằng Regular Expression
                const regex = new RegExp(keyword, 'i'); // 'i' cho phép tìm kiếm không phân biệt chữ hoa/thường
                response = await memberModel.find({
                    $or: [
                        { memberName: { $regex: regex } }, // Tìm trong memberName
                        { name: { $regex: regex } }        // Tìm trong name
                    ]
                });
            }
            return response;
        } catch (error) {
            console.error(error);
        }
        
    }

    getMemberDetailService = async (req, res, _id) => {
        try {
            const response = await memberModel.findOne({ _id });
            if (response)
                return response;
        } catch (error) {
            return undefined;
        }
    }

    changePasswordService = async (req, res, id, hashedPassword) => {
        try {
            const response = await memberModel.findByIdAndUpdate(id, { $set: { password: hashedPassword } }, { new: true })
            console.log("changePasswordService: ", response)
            if (response)
                return response;
        } catch (error) {
            console.log("error: ", error)
        }
    }

    banOrUnBandMemberService = async (req, res, id, is_delete) => {
        try {
            const response = await memberModel.findByIdAndUpdate(id, { $set: { is_delete: is_delete } }, { new: true })
            if (response)
                return response;
        } catch (error) {
            console.log("error: ", error)
        }
    }

    editMemberService = async (req, res, id, gender, name, YOB) => {
        try {
            const response = await memberModel.findByIdAndUpdate(
                id, { $set: { gender: gender, name: name, YOB: YOB } }, { new: true })
            if (response)
                return response;
        } catch (error) {
            console.log("error: ", error)
        }
    }

    commentWatch = async (req, res, rating, comment, author, watch) => {
        try {
            const response = await memberModel.findByIdAndUpdate(
                id, { $set: { phoneNumber: phoneNumber, name: name, YOB: YOB } }, { new: true })
            if (response)
                return response;
        } catch (error) {
            console.log("error: ", error)
        }
    }
}

module.exports = new memberService();
