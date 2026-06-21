const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'DRIP API is running!' })
})

app.use('/api/products', require('./routes/products'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/payment', require('./routes/payment'))
app.use('/api/auth', require('./routes/auth'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})