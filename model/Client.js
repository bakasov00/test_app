const { Schema, Types, model } = require('mongoose')

const client = new Schema({
  name: { type: String, required: true },
  patronymic: { type: String },
  surname: { type: String },
  adress: { type: String },
  phone: { type: Number, required: true },
  inn: { type: String, required: true },
})

module.exports = model('Client', client)
