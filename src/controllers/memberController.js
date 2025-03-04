const { commentPerfumeService } = require("../services/comment.service");
const { getMemberDetailService, editMemberService } = require("../services/member.service");
const { getPerfumeByIdService } = require("../services/perfume.service");

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
            console.log("gender: ", gender)
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

    commentPerfume = async (req, res) => {
        try {
            const { id } = req.params
            const { rating, content, author } = req.body;
            const response = await getPerfumeByIdService(req, res, id);
            if (!response) {
                // return res.status(404).json({
                //     message: MESSAGE.WATCH_NOT_FOUND,
                // });
                return res.render('error', { message: "Perfume not found", link: `/perfume/${id}` });
            }
            const member = await getMemberDetailService(req, res, author);
            if (!member) {
                // return res.status(404).json({
                //     message: MESSAGE.MEMBER_NOT_FOUND,
                // });
                return res.render('error', { message: "Member not found", link: `/perfume/${id}` });
            }
            console.log("perfume: ", response)
            console.log("member: ", member)
            const comment = await commentPerfumeService(req, res, response, rating, member, content)
            if(comment){
                // return res.status(201).json({
                //     message: MESSAGE.ADD_COMMENT_SUCCESSFULLY,
                //     data: comment
                // });
                return res.redirect(`/perfume/${id}`)
            }
        } catch (error) {
            const { id } = req.params
            // return res.status(500).json({
            //     message: MESSAGE.INTERNAL_SERVER_ERROR,
            // });
            return res.render('error', { message: error, link: `/perfume/${id}` });
        }
    }
}

module.exports = new memberController();
