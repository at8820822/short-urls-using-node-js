const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    

    {
   shortId: {
    type : String,
    required : true,
    unique  : true,
   },
   redirectURL:{
    type : String,
    required : true,

   },

   visitHistory:[{timestamp:{type: Number }}],
   cratedBy:{
    type : mongoose.Schema.Types.ObjectId,
    ref: 'users',
   },

},{timestamp:true});


const URL = mongoose.model('url', userSchema);

module.exports = URL;