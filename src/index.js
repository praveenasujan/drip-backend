const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'DRIP API is running!' })
})

app.use('/api/products', require('./routes/products'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/auth', require('./routes/auth'))

// Payment route disabled until Razorpay keys are added
// app.use('/api/payment', require('./routes/payment'))

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})