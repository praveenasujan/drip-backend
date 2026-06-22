const express = require('express')
const cors = require('cors')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ 
    message: 'DRIP API is running!',
    port: PORT,
    env: process.env.NODE_ENV,
    hasDB: !!process.env.DATABASE_URL
  })
})

try {
  app.use('/api/products', require('./routes/products'))
  app.use('/api/orders', require('./routes/orders'))
  app.use('/api/auth', require('./routes/auth'))
} catch (err) {
  console.error('Route loading error:', err.message)
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Database URL exists: ${!!process.env.DATABASE_URL}`)
})