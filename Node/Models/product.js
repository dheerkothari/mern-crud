const mongoose = require('mongoose');
const { Schema } = require(`mongoose`);
// perform pre-save validation for unique fields
const uniqueValidator = require('mongoose-unique-validator');

let productSchema = new mongoose.Schema({
    pdt_name:{
		type: String,
		require: true
	},
    pdt_price:{
		type: Number,
		require: true
	},
    pdt_brand:{
		type: String,
		require: true
	}
});

module.exports = mongoose.model('products',productSchema);