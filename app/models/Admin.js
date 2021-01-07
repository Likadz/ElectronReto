const { model , Schema} = require('mongoose')

const newAdminSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  pwd:{
    type:String,
    required: true
  }
})

module.exports = model('Admin', newAdminSchema);