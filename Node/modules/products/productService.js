const productModel = require('../../Models/product')

let addProduct = async(req) => {
    let query = {
        pdt_name: req.body.pdt_name,
        pdt_price:req.body.pdt_price,
        pdt_brand:req.body.pdt_brand
    }
    console.log("---------3",query)
    return await productModel.findOne(query).then((result) => {
        console.log("---------3",result)

        if (result && result!= null) {
            // email already exist
            return 1;

        } else {        
            //let productSave = new productModel(req.body);
          
            return productModel.create(req.body).then((data) => {
                return data;
            })
        }
    }).catch((er)=>{
        console.log("er---------3",er)

    })
}

let updateProduct = async (req,res) => {
    try{
        let id = req.params.id
        
        let checkProduct = await productModel.find({_id:id})
        // console.log('checkUSer',checkUser)
        
        if(checkProduct.length > 0){
            // 1.check in db 
            // 2. if yes,update user process
            // 3.if no .return 1
            
            let updatedProduct = await productModel.updateOne(
                {_id:id},
                {
                    pdt_name:req.body.pdt_name,
                    pdt_price:req.body.pdt_price,
                    pdt_brand:req.body.pdt_brand
                }
                
                )
                // console.log(updatedUser)
                return updatedProduct
        }else{
            return 1;
        }
    }catch(error){
        return 1
        console.log(error)
    }
}

let deleteProduct = async (req) => {
    try{
        let id = req.params.id
        console.log(id)
        
            let deleteProduct = await productModel.deleteOne({_id : id})  
            console.log(deleteProduct)
            if(deleteProduct.deletedCount > 0)
                return deleteProduct
            else{
                return 1;
            }
    }catch(error){
        console.log(error)
        return 1
    }
}

const listProduct = async (req) => {
    try{
        console.log(req)
        const listProducts = await productModel.find()
        return listProducts
    }catch(e){
        console.log(e)
    }   
}

const getProduct = async (req) => {
    try{
        if(req.params.id.length ==24 ){
            const getProduct = await productModel.findOne({_id:req.params.id})
            if(getProduct && getProduct.pdt_name)
                { return getProduct }
            else
               {
            console.log("error 1")
            return 1 }
        }else{
            console.log("error 2")
            return 2;
        }
        }catch(e){
            console.log("cache error")
        console.log(e)
    }    
}

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    listProduct,
    getProduct
}