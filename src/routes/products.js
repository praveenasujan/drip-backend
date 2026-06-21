const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id }
    })
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' })
  }
})

module.exports = router