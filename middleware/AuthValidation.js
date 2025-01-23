// import Joi from 'joi';

// const loginValidation = (req, res, next) => {
//     const schema = Joi.object({
//         email: Joi.string()
//             .email()
//             .required()
//             .messages({
//                 'any.required': 'Email is required',
//                 'string.email': 'Invalid email format',
//             }),
//         password: Joi.string()
//             .min(4)
//             .max(100)
//             .required()
//             .messages({
//                 'any.required': 'Password is required',
//                 'string.min': 'Password must be at least 4 characters long',
//                 'string.max': 'Password must not exceed 100 characters',
//             }),
//     });

//     const { error } = schema.validate(req.body);

//     if (error) {
//         return res.status(400).json({
//             message: error.details[0].message, // Send a user-friendly error message
//             success: false,
//         });
//     }

//     next();
// };

// export { loginValidation };
import Joi from 'joi';

const AuthValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'any.required': 'Email is required',
                'string.email': 'Invalid email format',
            }),
        password: Joi.string()
            .min(4)
            .max(100)
            .required()
            .messages({
                'any.required': 'Password is required',
                'string.min': 'Password must be at least 4 characters long',
                'string.max': 'Password must not exceed 100 characters',
            }),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
            success: false,
        });
    }

    next();
};

export default AuthValidation;


