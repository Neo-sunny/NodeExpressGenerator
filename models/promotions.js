const moongoose =  require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var currency  = mongoose.Types.Currency;

const promoSchema= new Schema({
    name:{
        type:string,
        required: true,
        unique: true
    },
    image:{
        type:string,
        required:true,
        unique: true
    },
    label:{
        type:string,
        required: true,
        unique: true
    },
    price:{
        type: currency,
        required: true,
        min: 0
    },
    description:{
        type:string,
        required: true,
    },
    featured:{
        type: Boolean,
        default: false
    },
},{
    timestamp:true
})

var Promos = mongoose.model('Promo', promoSchema);

module.exports = Promos;