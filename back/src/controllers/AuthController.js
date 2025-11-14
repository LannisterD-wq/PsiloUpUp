const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config/env');
const { ensureFields } = require('../utils/validation');

function signToken(user) {
  return jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '24h' });
}

async function register(req, res) {
  try {
    const required = ensureFields(req.body, ['name', 'email', 'password']);
    if (required.length) {
      return res.status(400).json({ error: `Campos obrigatórios ausentes: ${required.join(', ')}` });
    }
    const { name, email, password, phone, cpf } = req.body;
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(409).json({ error: 'E-mail já cadastrado.' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, phone, cpf });
    const token = signToken(user);
    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Falha no cadastro.' });
  }
}

async function login(req, res) {
  try {
    const required = ensureFields(req.body, ['email', 'password']);
    if (required.length) {
      return res.status(400).json({ error: 'Informe e-mail e senha.' });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }
    const token = signToken(user);
    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Falha no login.' });
  }
}

module.exports = {
  register,
  login,
};

