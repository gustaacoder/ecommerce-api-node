const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
  const { userId, items } = req.body;
  try {
    const order = await prisma.order.create({
      data: {
        userId,
        items: {
          createMany: {
            data: items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price
            }))
          }
        }
      },
      include: { items: true }
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
};

module.exports = { createOrder };