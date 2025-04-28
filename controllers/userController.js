const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Nome, email e senha são obrigatórios" });
  }

  try {
    const user = await prisma.user.create({
      data: { 
        name,
        email,
        password
      }
    });
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: "Email já cadastrado" });
    }
    res.status(500).json({ 
      error: 'Erro ao criar usuário',
      details: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

module.exports = { createUser, getAllUsers };