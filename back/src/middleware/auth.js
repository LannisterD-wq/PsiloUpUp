const jwt = require('jsonwebtoken');
const config = require('../config/env');
const { User } = require('../models');

async function authRequired(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) {
      return res.status(401).json({ error: 'Token ausente' });
    }
    const payload = jwt.verify(token, config.jwtSecret);
    const user = await User.findByPk(payload.userId);
    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = {
  authRequired,
};

