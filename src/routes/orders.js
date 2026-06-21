const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Create order
router.post('/', async (req, res) => {
  try {
    const { items, total, name, phone, address, city, state, pincode } = req.body

    const order = await prisma.order.create({
      data: {
        total,
        name,
        phone,
        address,
        city,
        state,
        pincode,
        items: {
          create: items.map((item) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            size: item.size,
            quantity: item.quantity
          }))
        }
      },
      include: { items: true }
    })

    res.json({ success: true, order })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create order' })
  }
})

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' }
    })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

module.exports = router