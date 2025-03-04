const mongoose = require("mongoose");
const commentModel = require("../models/comment.model");

class CommentService {
    commentPerfumeService = async (req, res, perfume, rating, member, content) => {
        try {
            // Kiểm tra ObjectId hợp lệ
            if (!mongoose.Types.ObjectId.isValid(member._id)) {
                throw new Error("Invalid author ID");
            }

            // Chuyển rating thành số nguyên
            const ratingNumber = parseInt(rating, 10);
            if (isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 3) {
                throw new Error("Invalid rating value");
            }

            // Tạo comment mới
            const newComment = new commentModel({
                rating: ratingNumber,
                author: new mongoose.Types.ObjectId(member._id),
                content: content
            });

            // Lưu comment vào database
            const savedComment = await newComment.save();

            // Chỉ push ObjectId của comment vào perfume
            perfume.comments.push(savedComment._id);
            const updatedPerfume = await perfume.save();

            return updatedPerfume;
        } catch (error) {
            console.error("Error: ", error);
            throw error;
        }
    };
}

module.exports = new CommentService();
