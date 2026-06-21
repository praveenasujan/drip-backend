const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.product.create({ data: { name: 'Classic White Tee', description: 'A clean minimal white t-shirt.', price: 499, originalPrice: 799, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', category: 'men', sizes: ['S', 'M', 'L', 'XL'], stock: 100 } })
  await prisma.product.create({ data: { name: 'Slim Fit Jeans', description: 'Modern slim fit jeans.', price: 1299, originalPrice: 1999, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', category: 'men', sizes: ['28', '30', '32', '34'], stock: 80 } })
  await prisma.product.create({ data: { name: 'Floral Kurta', description: 'Beautiful floral kurta.', price: 899, originalPrice: 1299, image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400', category: 'women', sizes: ['S', 'M', 'L', 'XL'], stock: 60 } })
  await prisma.product.create({ data: { name: 'Casual Hoodie', description: 'Comfortable hoodie.', price: 1499, originalPrice: 2199, image: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=400', category: 'unisex', sizes: ['S', 'M', 'L', 'XL'], stock: 50 } })
  console.log('Products seeded successfully!')
}

main()
  .catch(console.error)
  .finally(function() { prisma.$disconnect() })