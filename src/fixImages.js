const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.product.updateMany({
    where: { name: 'Classic White Tee' },
    data: { image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' }
  })
  await prisma.product.updateMany({
    where: { name: 'Slim Fit Jeans' },
    data: { image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400' }
  })
  await prisma.product.updateMany({
    where: { name: 'Floral Kurta' },
    data: { image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400' }
  })
  await prisma.product.updateMany({
    where: { name: 'Casual Hoodie' },
    data: { image: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=400' }
  })
  console.log('Images updated!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())