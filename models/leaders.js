const moongoose =  require('mongoose');
const Schema = mongoose.Schema;

const leaderSchema= new Schema({
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
    designation:{
        type:string,
        required: true,
    },
    abbr:{
        type:string,
        required: true,
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
});

var Leaders = mongoose.model('Leader', promoSchema);

module.exports = Leaders;