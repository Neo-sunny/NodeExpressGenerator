const moongoose =  require('mongoose');
const Schema = moongoose.Schema;

const leaderSchema= new Schema({
    name:{
        type:String,
        required: true,
        unique: true
    },
    image:{
        type:String,
        required:true,
        unique: true
    },
    designation:{
        type:String,
        required: true,
    },
    abbr:{
        type:String,
        required: true,
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
});

var Leaders = moongoose.model('Leader', leaderSchema);

module.exports = Leaders;