const mongoose = require('mongoose');

const postModal = mongoose.Schema({
  title : {type: String, required:true},
  post : {type: String, required:true},
  imagePath : {type:String, required:true},
  creator : {type : mongoose.Schema.Types.ObjectId,ref:'User',required : true}
});

module.exports  = mongoose.model('Post',postModal);
