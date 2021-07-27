const userModel = require('../../Models/user');
const jwt = require('jsonwebtoken')
jwtKey = "jwt"
const bcrypt = require('bcrypt');

let addUser = (req) => {
    console.log("service");
    let query = {
        usr_firstname: req.body.firstName,
        usr_lastname:req.body.lastName,
        usr_email:req.body.email,
        usr_password:req.body.password,
        usr_mobile:req.body.phone,
        usr_state:req.body.state,
        usr_postalcode:req.body.pincode,
        usr_role:req.body.role,
        usr_token:""
    }

    return userModel.findOne(query).then((result) => {

        if (result) {
            // email already exist
            return 1;

        } else {        
            
            let userSave = new userModel(query);
            //console.log("User save is ::: ",query);
            //console.log(userSave,"usersave")
            return userSave.save().then((result) => {
                return result;
            })
        }
    })
}

const loginUser = async (req,res) => {
    console.log("called loginUser")
    var email = req.body.usr_email;
    var password = req.body.usr_password;
    
    let getUser = await userModel.findOne({usr_email:email})
        //console.log(getUser)
        if(!getUser) {
            return 1;
        }
        else{
            //console.log("else")
            const checkPassword = await bcrypt.compare(password,getUser.usr_password)
            //console.log("checkPassword",checkPassword)
                if(checkPassword) {
                    //console.log("checkPassword")
                    try {
                        const token = await jwt.sign({getUser},jwtKey);
                        //console.log(token)
                        //console.log(getUser.usr_token.length)
                        if(getUser.usr_token.length <= 0)
                        await userModel.updateOne({usr_email:email},{usr_token:token})
                        return { firstname: getUser.usr_firstname, lastname: getUser.usr_lastname, token, role: getUser.usr_role };
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    return 1;
                }
        }      
}

let adminUser = async (req) => {
    const adminUser = await userModel.findOne({usr_role : "Admin"})
    if(!adminUser) {
        const createAdmin = {
            usr_firstName : "Admin",
            usr_lastName : "User",
            usr_email : "Admin@gmail.com",
            usr_password : "admin@123",
            usr_mobile : "9328217188",
            usr_country : "india",
            usr_city : "Ahmedabad",
            usr_role : "Admin",
        }
        let userSave = new userModel(createAdmin);
        
        return userSave.save().then((result) => {
            return result;
        })
    }  
   loginUser()
}

const updateUser = async (req,res) => {
    try{
        let id = req.params.id
        
        let checkUser = await userModel.find({_id:id})
        // console.log('checkUSer',checkUser)
        
        if(checkUser.length > 0){
            // 1.check in db 
            // 2. if yes,update user process
            // 3.if no .return 1
            let updatedUser = await userModel.updateOne(
                {_id:id},
                {
                    usr_firstname:req.body.usr_firstname
                } 
                )
                // console.log(updatedUser)
                return updatedUser
        }else{
            return 1;
        }
    }catch(error){
        return 1
        console.log(error)
    }
}

let deleteUser = async (req) => {
    try{
        let id = req.params.id
        console.log(id)
        
            let deleteUser = await userModel.deleteOne({_id : id})  
            //console.log(deleteUser)
            if(deleteUser.deletedCount > 0)
                return deleteUser
            else{
                return 1;
            }
    }catch(error){
        console.log(error)
        return 1
    }
}

const listUser = async (req) => {
    try{
        //console.log(req)
        const listUsers = await userModel.find()
        return listUsers
    }catch(e){
        console.log(e)
    }   
}

const getUser = async (req) => {
    try{
        if(req.params.id.length ==24 ){
            const getUser = await userModel.findOne({_id:req.params.id})
            if(getUser && getUser.usr_email)
                { return getUser }
            else
               { return 1 }
        }else{
            return 2;
        }
        }catch(e){
        console.log(e)
    }    
}

module.exports = {
    addUser,
    loginUser,
    adminUser,
    updateUser,
    deleteUser,
    listUser,
    getUser
}