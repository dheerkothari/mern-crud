const router = require('express').Router();
const facade = require('./userFacade');
const validator = require('./userValidation');
const resHandler = require('../../handlers/responseHandler');

router.route('/addUser').post([validator.addUser], (req, res) => {
    console.log("route")
    return facade.addUser(req, res).then((result) => {
        resHandler.successHandler(res, result)
    }).catch((err) => {
        console.log(err);
        resHandler.errorHandler(res, err) 
    })
})

router.route('/login').post((req,res) => {
    facade.loginUser(req,res).then((result) => {
        resHandler.successHandler(res,result)
    }).catch((error) => {
        console.log(error.code)
        resHandler.errorHandler(res,error)
    })
})

router.route('/adminUser').post((req, res) => {
    //console.log("route")
    return facade.adminUser(req, res).then((result) => {
        resHandler.successHandler(res, result)
    }).catch((err) => {
        resHandler.errorHandler(res, err) 
    })
})

router.route('/updateUser/:id').patch((req, res) => {
    //console.log("route")
    return facade.updateUser(req, res).then((result) => {
        resHandler.successHandler(res, result)
    }).catch((err) => {
        resHandler.errorHandler(res, err) 
    })
})

router.route('/deleteUser/:id').delete((req, res) => {
    //console.log("route")
    return facade.deleteUser(req, res).then((result) => {
        resHandler.successHandler(res, result)
    }).catch((err) => {
        resHandler.errorHandler(res, err) 
    })
})

router.route('/listUser').get((req, res) => {
    //console.log("route")
    return facade.listUser(req, res).then((result) => {
        resHandler.successHandler(res, result)
    }).catch((err) => {
        resHandler.errorHandler(res, err) 
    })
})

router.route('/getUser/:id').get((req, res) => {
    //console.log("route")
    return facade.getUser(req, res).then((result) => {
        resHandler.successHandler(res, result)
    }).catch((err) => {
        resHandler.errorHandler(res, err) 
    })
})
module.exports = router;