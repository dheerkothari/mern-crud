const joi = require('joi');
//const regEx = require('../../utils/regularExpression.js')
const resHndlr = require('../../handlers/responseHandler');
//const userConstant = require('./userConstant')

let addUser = async(req, res, next) => {
    //console.log("userValidation" , req.body)
    try {
        const UserSchema = joi.object({
            firstName : joi.string().required(),
            lastName : joi.string().required(),
            email : joi.string().required(),
            password : joi.string().required(),
            //usr_mobile : joi.string().min(1000000000).max(9999999999).required(),
            phone : joi.string().required(),
            state : joi.string().required(),
            pincode : joi.string().required(),
            role : joi.string().valid('ADMIN', 'USER').uppercase().required()
        })
        // let schema = Joi.object({
            
        //     usr_email: Joi.string().required().pattern(regEx.emailRegEx)
        //         .messages({ 'string.pattern.base': userConstant.VALIDATION.invalidEmail }),
        // })

        await UserSchema.validateAsync(req.body, { allowUnknown: true });
        //await UserSchema.validate(data)
        next();

    } catch (error) {
        resHndlr.validationErrorHandler(res, error);
    }
}

module.exports = {
    addUser
}