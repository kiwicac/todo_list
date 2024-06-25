const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  checked:Boolean,
  task:{
    type:String,
    required:true
  },

})


const todoModel = mongoose.model('todos',todoSchema)

module.exports = todoModel