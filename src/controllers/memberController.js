
// class memberController {
//     getAllMembers = async (req, res) => {
//         try {
//             const { keyword } = req.body
//             const response = await getMembersService(req, res, keyword);
//             if (response) {
//                 res.status(200).json({
//                     message: "Get Members Successfully!",
//                     data: response
//                 });
//             } else {
//                 return res.status(500).json({
//                     message: "An error occurred",
//                 });
//             }
//         } catch (error) {
//             return res.status(500).json({
//                 message: "An error occurred",
//             });
//         }
//     }

    
// }

// module.exports = new memberController();
