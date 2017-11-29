const moongoose =  require('mongoose');
const Schema = moongoose.Schema;
require('mongoose-currency').loadType(moongoose);
var currency  = moongoose.Types.Currency;

const promoSchema= new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type:String,
        required:true,
        unique: true
    },
    label:{
        type:String,
        required: true,
        unique: true
    },
    price:{
        type: currency,
        required: true,
        min: 0
    },
    description:{
        type:String,
        required: true,
    },
    featured:{
        type: Boolean,
        default: false
    },
},{
    timestamp:true
})

var Promos = moongoose.model('Promo', promoSchema);

module.exports = Promos;