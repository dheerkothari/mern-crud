const userservice = require('./userService');
const resHandler = require('../../handlers/responseHandler');
const constant = require('../../utils/constant');
const userConstant = require('./userConstant');

let addUser = (req) => {
    return userservice.addUser(req).then((data) => {
    // console.log("facade")

    console.log(req.body, "facade laksdjfkl;j")
        if(data && data === 1) {
            console.log('inside if');
            return resHandler.requestResponse(false, constant.HTTP_CODE.badRequest, userConstant.MESSAGE.emailExist, data)
        } else {
            console.log('inside else');
            return resHandler.requestResponse(true, constant.HTTP_CODE.ok, userConstant.MESSAGE.addSuccess, data)
        }
    }, (error) => {
        console.log('addUser Error => ', error)
        return resHandler.requestResponse(false, constant.HTTP_CODE.badRequest, userConstant.MESSAGE.addError, error);
    })
}

const loginUser = async (req) => {
    return userservice.loginUser(req).then((data) => {
        if(data && data === 1) {
            return resHandler.resHandler.requestResponse(false,constant.HTTP_CODE.badRequest,userConstant.MESSAGE.addError,data)
        }  else {
                return resHandler.requestResponse(true,constant.HTTP_CODE.ok , userConstant.MESSAGE.getSuccess,data)
            }
        } , (error) => {
            return resHandler.requestResponse(false,constant.HTTP_CODE.badRequest,userConstant.MESSAGE.addError,error)
        })           
}

let adminUser = (req) => {
    return userservice.adminUser(req).then((data) => {
    console.log(data)

    //console.log(req.body, "facade")
        if(data && data === 1) {
            return resHandler.requestResponse(false, constant.HTTP_CODE.badRequest, userConstant.MESSAGE.userNotFound, data)
        } else {
            return resHandler.requestResponse(true, constant.HTTP_CODE.ok, userConstant.MESSAGE.updateSuccess, data)
        }
    }, (error) => {
        console.log('updateUser Error => ', error)
        return resHandler.requestResponse(false, constant.HTTP_CODE.badRequest, userConstant.MESSAGE.addError, error);
    })
}

let updateUser = (req) => {
    return userservice.updateUser(req).then((data) => {
    console.log(data)

    //console.log(req.body, "facade")
        if(data && data === 1) {
            return resHandler.requestResponse(false, constant.HTTP_CODE.badRequest, userConstant.MESSAGE.userNotFound, data)
        } else {
            return resHandler.requestResponse(true, constant.HTTP_CODE.ok, userConstant.MESSAGE.updateSuccess, data)
        }
    }, (error) => {
        console.log('updateUser Error => ', error)
        return resHandler.requestResponse(false, constant.HTTP_CODE.badRequest, userConstant.MESSAGE.updateError, error);
    })
}

let deleteUser = (req) => {
    return userservice.deleteUser(req).then((data) => {
    console.log(data)

    //console.log(req.body, "facade")
        if(data && data === 1) {
            return resHandler.requestResponse(false, constant.HTTP_CODE.badRequest, userConstant.MESSAGE.userNotFound, data)
        } else {
            return resHandler.requestResponse(true, constant.HTTP_CODE.ok, userConstant.MESSAGE.deleteSuccess, data)
        }
    }, (error) => {
        console.log('updateUser Error => ', error)
        return resHandler.requestResponse(false, constant.HTTP_CODE.badRequest, userConstant.MESSAGE.deleteError, error);
    })
}

let listUser = (req) => {
    return userservice.listUser(req).then((data) => {
    console.log(data)

    //console.log(req.body, "facade")
        if(data && data === 1) {
            return resHandler.requestResponse(false, constant.HTTP_CODE.badRequest, userConstant.MESSAGE.userNotFound, data)
        } else {
            return resHandler.requestResponse(true, constant.HTTP_CODE.ok, userConstant.MESSAGE.deleteSuccess, data)
        }
    }, (error) => {
        console.log('updateUser Error => ', error)
        return resHandler.requestResponse(false, constant.HTTP_CODE.badRequest, userConstant.MESSAGE.deleteError, error);
    })
}

let getUser = (req) => {
    return userservice.getUser(req).then((data) => {
    console.log(data)

    //console.log(req.body, "facade")
        if(data && data === 1) {
            return resHandler.requestResponse(false, constant.HTTP_CODE.badRequest, userConstant.MESSAGE.userNotFound, data)
        } else if(data && data === 2) {
            return resHandler.requestResponse(true, constant.HTTP_CODE.ok, userConstant.MESSAGE.idError , "")
        } 
        else {
            return resHandler.requestResponse(true, constant.HTTP_CODE.ok, userConstant.MESSAGE.getSuccess , data)
        }
    }, (error) => {
        console.log('updateUser Error => ', error)
        return resHandler.requestResponse(false, constant.HTTP_CODE.badRequest, userConstant.MESSAGE.deleteError, error);
    })
}


module.exports = {
    //getEmployees,
    addUser,
    loginUser,
    adminUser,
    updateUser,
    deleteUser,
    listUser,
    getUser
}