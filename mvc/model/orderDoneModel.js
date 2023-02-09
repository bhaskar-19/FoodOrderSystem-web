const db = require('./connection').db;
const mongoose = require('./connection').mongoose;

//console.log(db+"   data base  connection   "+mongoose);

const orderDoneSchema = mongoose.Schema({
    orderId : {
        type : Number,
        required : true
    },
    items : {
        type : [{item : {type : String, required : true},
                quantity:{type : Number, required : true}}]
    }
}); 

let orderDoneModel = mongoose.model('ordersDone',orderDoneSchema,'ordersDone');
module.exports = {orderDoneModel};