const express = require('express')
const router = express.Router()
const Razorpay = require('razorpay')
const crypto = require('crypto')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// Create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body
    const order = await razorpay.orders.create({
      amount: amount * 100, // convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    })
    res.json({ success: true, order })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create payment order' })
  }
})

// Verify payment after success
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body

    const sign = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex')

    if (expectedSign === razorpay_signature) {
      // Update order status in database
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'processing',
          paymentId: razorpay_payment_id
        }
      })
      res.json({ success: true, message: 'Payment verified!' })
    } else {
      res.status(400).json({ error: 'Invalid payment signature' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Payment verification failed' })
  }
})

module.exports = router