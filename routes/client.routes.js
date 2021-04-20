const { Router } = require('express')
const Client = require('../model/Client')
const Admin = require('../model/Admin')
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')

require('dotenv').config()

const router = Router()

router.post('/post', async (req, res) => {
  try {
    const { inn } = req.body
    const cipher = CryptoJS.AES.encrypt(inn, process.env.CIPHER_SECRET).toString()

    await Client.create({ ...req.body, inn: cipher })

    res.status(200).json({ message: 'Success' })
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так', err: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const admin = await Admin.findById(decoded.adminId)

    if (!admin) {
      return res.status(400).json({ message: 'Нет такаго админа' })
    }

    const clients = await Client.find({})

    res.status(200).json(clients)
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так', err: error.message })
  }
})

module.exports = router
