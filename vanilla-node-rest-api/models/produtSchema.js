const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var productSchema = new Schema({
    name: String,
    description: String,            
    price: String
})
module.exports = mongoose.model('products', productSchema);

