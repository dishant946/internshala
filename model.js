const mongoose=require('mongoose');
const mongoschema=mongoose.Schema({
    rank:Number,
    city:String,
    population11:String,
    population1:String,
    state:String
});
const cities=mongoose.model("city",mongoschema);
module.exports=cities;