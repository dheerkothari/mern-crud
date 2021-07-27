const constant = require('../utils/constant');

/**
 * @ Function Name      : _sendResponse
 * @ Function Params    : 
 * @param {*} res 
 * @param {*} result 
 * @ Function Purpose   : Common API's response send
 */
let _sendResponse = (res, result) => {
    res.send(result)
}

/**
 * @ Function Name      : successHandler
 * @ Function Params    : 
 * @param {*} res 
 * @param {*} result 
 * @ Function Purpose   : Set response for success API's
 */
let successHandler = (res, result) => {

    const response = {
        status: result.status,
        code: result.code,
        message: result.message,
        data: result.data
    }
    res.status(result.status)
    _sendResponse(res, response);
}

/**
 * @ Function Name      : errorHandler
 * @ Function Params    : 
 * @param {*} res 
 * @param {*} result 
 * @ Function Purpose   : Set response for error handle API's
 */
let errorHandler = (res, result) => {
    const response = {
        status: false,
        code: result.code,
        message: result.message || '',
        data: result.data || {}
    }
    console.log("result.code" + result.code);
    res.status(result.status);
    _sendResponse(res, response);
}

/**
 * @ Function Name      : validationErrorHandler
 * @ Function Params    : 
 * @param {*} res 
 * @param {*} error 
 * @ Function Purpose   : Set response for common validation error handler
 */
let validationErrorHandler = (res, error) => {

    console.log('valdiation Error --->', error);

    const response = {
        status: false,
        code: constant.HTTP_CODE.badRequest,
        message: error.details ? error.details[0].message : 'There is some issue with validation.',
        data: {}
    }
    res.status(constant.HTTP_CODE.badRequest);
    _sendResponse(res, response);
}

let requestResponse = (code, status, message, data) => {
    return { code, status, message, data }
}

module.exports = {
    successHandler,
    errorHandler,
    validationErrorHandler,
    requestResponse,
};