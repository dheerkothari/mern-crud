const router = require('express').Router();
const facade = require('./productFacade');
//const validator = require('./userValidation');
const resHandler = require('../../handlers/responseHandler');

router.route('/addProduct').post((req, res) => {
    console.log("---------1")
    
    facade.addProduct(req, res).then((result) => {
        resHandler.successHandler(res, result)
    }).catch((err) => {
        resHandler.errorHandler(res, err) 
    })
})

router.route('/updateProduct/:id').patch((req, res) => {
    //console.log("route")
    facade.updateProduct(req, res).then((result) => {
        resHandler.successHandler(res, result)
    }).catch((err) => {
        resHandler.errorHandler(res, err) 
    })
})

router.route('/deleteProduct/:id').delete((req, res) => {
    //console.log("route")
    facade.deleteProduct(req, res).then((result) => {
        resHandler.successHandler(res, result)
    }).catch((err) => {
        resHandler.errorHandler(res, err) 
    })
})

router.route('/listProduct').get((req, res) => {
    //console.log("route")
    facade.listProduct(req, res).then((result) => {
        resHandler.successHandler(res, result)
    }).catch((err) => {
        resHandler.errorHandler(res, err) 
    })
})

router.route('/getProduct/:id').get((req, res) => {
    //console.log("route")
    return facade.getProduct(req, res).then((result) => {
        console.log("result.code2" + result.code);
        resHandler.successHandler(res, result)
    }).catch((err) => {
        console.log(err);
        resHandler.errorHandler(res, err) 
    })
})

module.exports = router;