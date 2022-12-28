const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

const password = process.argv[2]

const url = `mongodb+srv://fullstackopen:${password}@cluster0.wzqaapf.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person.save().then(() => {
    console.log('success')
    mongoose.connection.close()
  })
} else{
  console.log('phonebook:')

  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}