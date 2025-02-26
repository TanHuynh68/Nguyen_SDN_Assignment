const { body, check } = require('express-validator');

class authMiddleWare {
    validateRegister = [
        body('memberName').notEmpty().withMessage('memberName is required!'),
        body('password').notEmpty().withMessage('password is required!'),
        check('password')
            .isLength({ min: 6 }) // Đảm bảo độ dài ít nhất là 6 ký tự
            .withMessage('password must be at least 6 digits long.')
            .matches(/^\d+$/) // Đảm bảo chỉ chứa số
            .withMessage('password must only contain digits.'),
        body('name').notEmpty().withMessage('name is required!'),
        body('phoneNumber').notEmpty().withMessage('phoneNumber is required!'),
    ];

    loginValidate = [
        body('memberName').notEmpty().withMessage('memberName is required!'),
        body('password').notEmpty().withMessage('password is required!'),
    ];
}

module.exports = new authMiddleWare();