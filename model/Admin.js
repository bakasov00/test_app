const { Schema, Types, model } = require('mongoose')

const admin = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

module.exports = model('Admin', admin)
