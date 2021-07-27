const userRoute = require('../modules/users/userRoute')
const productRoute = require('../modules/products/productRoute')

module.exports = (app) => {

    // employee route
    app.use('/api', [userRoute]);
    app.use('/api/product', [productRoute]);

}