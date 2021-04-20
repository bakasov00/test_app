const { Router } = require('express')
const Admin = require('../model/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const router = Router()

router.post('/regis', async (req, res) => {
  try {
    const { username, password } = req.body

    const admin = await Admin.findOne({ username })
    if (admin) {
      return res.status(400).json({ message: 'Такой пользователя уже есть' })
    }

    const hashPassword = await bcrypt.hash(password, 12)
    await Admin.create({ username, password: hashPassword })

    res.status(200).json({ message: 'Admin added' })
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так', err: error.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const admin = await Admin.findOne({ username })

    if (!admin) {
      return res.status(400).json({ message: 'Такого админа нет' })
    }
    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Не верный пароль' })
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так', err: error.message })
  }
})

module.exports = router
