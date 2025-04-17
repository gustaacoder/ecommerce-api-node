// controllers/productController.js


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProducts = async (req, res) => {
    try {
      console.log("Iniciando busca de produtos..."); // 👈 1º log (entrou na função)
      const products = await prisma.product.findMany();
      console.log('Produtos encontrados:', products); // 👈 2º log (resultado da query)
      res.json(products);
    } catch (error) {
      console.error('Erro no getProducts:', error); // 👈 3º log (erro se ocorrer)
      res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
  };

const createProduct = async (req, res) => {
  const { title, price, category, image } = req.body;

  try {
    const product = await prisma.product.create({
      data: { title, price, category, image },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

module.exports.getProducts = getProducts;
module.exports.createProduct = createProduct;