const mongoose = require(`mongoose`);
const { Schema } = require(`mongoose`);
// perform pre-save validation for unique fields
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    //_id:mongoose.Schema.Types.ObjectId,
	usr_firstname: {
		type: String,
		require: true
	},
	usr_lastname: {
		type: String,
		require: true
	},
	usr_email: {
		type: String,
		require: true,
		unique: true
	},
	usr_password: {
		type: String,
		require: true
	},
	usr_mobile: {
		type: Number,
		minlength: 10,
		maxlength: 10,
		unique: true,
		require: true
	},
	usr_state: {
		type: String,
		maxlength: 50
	},
	usr_postalcode: {
		type: Number,
		maxlength: 6, minlength: 6
	},
	usr_role: {
		type: String,
		require: true
	},
	usr_token: {
		type: String
	}
	// usr_gender: {
	// 	type: String,
	// 	default: 'Not selected'
	// }
});
//userSchema.plugin(uniqueValidator);
userSchema.pre('save', async function (next){
	try{
		console.log(this.usr_password)
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(this.usr_password, salt)
		this.usr_password = hashedPassword
		next()
	}
	catch(error){
		next(error)
	}
})

module.exports = mongoose.model('users',userSchema);
