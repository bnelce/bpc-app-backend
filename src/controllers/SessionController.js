const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../database/connection');
const authConfig = require('../config/auth');

module.exports = {


  async create(req, res) {
    const { email, password } = req.body;

    const user = await connection('users').where('email', email).select('*').first();

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado!' });
    }

    if (!(bcrypt.compare(password, this.password_hash))) {
      return res.status(401).json({ error: 'Senha incorreta!' });
    }


    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  },
};
