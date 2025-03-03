const { getMemberDetailService, editMemberService } = require("../services/member.service");

class memberController {
    getMemberDetail = async (req, res) => {
        try {
             // Kiểm tra nếu `req.cookies` tồn tại
             if (!req.cookies || !req.cookies.userData) {
                return res.render('error', { message: "No user data found in cookies!", link: "/change-password" });
            }
            console.log("userDataJson", JSON.parse(req.cookies.userData));
            const user = JSON.parse(req.cookies.userData);

            const response = await getMemberDetailService(req, res, user._id);
            console.log("res: ", response)
            if (response) {
                // res.status(200).json({
                //     message: "Get Member Detail Successfully!",
                //     data: response
                // });
            } else if (response === undefined) {
                // return res.status(404).json({
                //     message: "User not found or id is not exsist!",
                // });
            }
        } catch (error) {
            return res.status(500).json({
                message: "An error occurred",
            });
        }
    }
    editMember = async (req, res) => {
        try {
            if (!req.cookies || !req.cookies.userData) {
                return res.render('error', { message: "No user data found in cookies!", link: "/change-password" });
            }
            console.log("userDataJson", JSON.parse(req.cookies.userData));
            const user = JSON.parse(req.cookies.userData);
            const { gender, name, YOB } = req.body;
            const response = await editMemberService(req, res, user._id, gender, name, YOB);
            if (response) {
                // res.status(200).json({
                //     message: "Edit Member Successfully!",
                //     data: response
                // });
                return res.redirect('/')
            } else {
                // return res.status(404).json({
                //     message: "User not found or id is not exsist!",
                // });
                return res.render('error', { message: "User not found or id is not exsist!", link: "/change-profile" });
            }
        } catch (error) {
            // return res.status(500).json({
            //     message: "An error occurred",
            // });
            return res.render('error', { message: error, link: "/change-profile" });
        }
    }

}

module.exports = new memberController();
