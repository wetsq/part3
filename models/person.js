const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const url = process.env.MONGODB_URI

console.log(url)
mongoose.connect(url)
  .then(() => {
    console.log('success')
  })
  .catch((error) => {
    console.log(error)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: (v) => {
        return /\d{2,3}-\d{5,}/.test(v)
      },
      message: () => 'Number must have hyphen as a third or as a fourth character'
    },
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)