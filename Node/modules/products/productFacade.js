const productservice = require('./productService');
const resHandler = require('../../handlers/responseHandler');
const constant = require('../../utils/constant');
const productConstant = require('./productConstant');

let addProduct = (req) => {
    return productservice.addProduct(req).then((data) => {
    //console.log("facade")
    console.log("---------2",data)
    //console.log(req.body, "facade")
        if(data && data == 1) {
            return resHandler.requestResponse(false, constant.HTTP_CODE.badRequest, productConstant.MESSAGE.addError, data)
        } else {
            return resHandler.requestResponse(true, constant.HTTP_CODE.ok, productConstant.MESSAGE.addSuccess, data)
        }
    }).catch((error) => {
        
        console.log('addUser Error => ', error)
        return resHandler.requestResponse(false, constant.HTTP_CODE.badRequest, productConstant.MESSAGE.addError, error);
    })
    // catch (error) => {
    // })
}

let updateProduct = (req) => {
    return productservice.updateProduct(req).then((data) => {
    //console.log("facade")

    //console.log(req.body, "facade")
        if(data && data === 1) {
            return resHandler.requestResponse(false, constant.HTTP_CODE.badRequest, productConstant.MESSAGE.productNotFound, data)
        } else {
            return resHandler.requestResponse(true, constant.HTTP_CODE.ok, productConstant.MESSAGE.updateSuccess, data)
        }
    }, (error) => {
        console.log('addUser Error => ', error)
        return resHandler.requestResponse(false, constant.HTTP_CODE.badRequest, productConstant.MESSAGE.updateError, error);
    })
}

let deleteProduct = (req) => {
    return productservice.deleteProduct(req).then((data) => {
    //console.log("facade")

    //console.log(req.body, "facade")
        if(data && data === 1) {
            return resHandler.requestResponse(false, constant.HTTP_CODE.badRequest, productConstant.MESSAGE.productNotFound, data)
        } else {
            return resHandler.requestResponse(true, constant.HTTP_CODE.ok, productConstant.MESSAGE.deleteSuccess, data)
        }
    }, (error) => {
        console.log('addUser Error => ', error)
        return resHandler.requestResponse(false, constant.HTTP_CODE.badRequest, productConstant.MESSAGE.deleteError, error);
    })
}

let listProduct = (req) => {
    return productservice.listProduct(req).then((data) => {
    //console.log("facade")

    //console.log(req.body, "facade")
        if(data && data === 1) {
            return resHandler.requestResponse(false, constant.HTTP_CODE.badRequest, productConstant.MESSAGE.productNotFound, data)
        } else {
            return resHandler.requestResponse(true, constant.HTTP_CODE.ok, productConstant.MESSAGE.getSuccess, data)
        }
    }, (error) => {
        console.log('addUser Error => ', error)
        return resHandler.requestResponse(false, constant.HTTP_CODE.badRequest, productConstant.MESSAGE.getError, error);
    })
}

let getProduct = (req) => {
    return productservice.getProduct(req).then((data) => {
    console.log(data)

    //console.log(req.body, "facade")
        if(data && data === 1) {
    console.log("enter 1")
            return resHandler.requestResponse(false, constant.HTTP_CODE.badRequest, productConstant.MESSAGE.userNotFound, data)
        } else if(data && data === 2) {
    console.log("enter 2")
            return resHandler.requestResponse(false, constant.HTTP_CODE.ok, productConstant.MESSAGE.idError , "")
        } 
        else {
    console.log("enter else")
            return resHandler.requestResponse(true, constant.HTTP_CODE.ok, productConstant.MESSAGE.getSuccess , data)
        }
    }, (error) => {
        console.log('updateUser Error => ', error)
        return resHandler.requestResponse(false, constant.HTTP_CODE.badRequest, productConstant.MESSAGE.deleteError, error);
    })
}

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    listProduct,
    getProduct
}