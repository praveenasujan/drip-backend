const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient()

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return res.status(400).json({ error: 'Email already exists' })

    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { name, email, password: hashed, phone }
    })

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(400).json({ error: 'Invalid credentials' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (error) {
    res.status(500).json({ error: 'Login failed' })
  }
})

module.exports = router