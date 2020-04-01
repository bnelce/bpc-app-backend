const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Yup = require('yup');
const connection = require('../../database/connection');
const Mail = require('../../lib/Mail');

module.exports = {
  async update(req, res) {
    // validação de campos
    const schema = Yup.object().shape({
      email: Yup.string().email(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Email é obrigatório' });
    }

    const { email } = req.body;

    // verificando se usuario existe
    const user = await connection('users').where('email', email).select('*').first();

    if (!user) {
      return res.status(400).json({ error: 'Email não cadastrado.' });
    }

    // montando a nova senha
    const newPassword = crypto.randomBytes(4).toString('HEX');

    // encriptando a senha
    const newPasswordHash = await bcrypt.hash(newPassword, 8);

    await connection('users').where('email', email).update({
      password_hash: newPasswordHash,
    });

    Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Recuperação de Senha',
      template: 'forgotPassword',
      context: {
        bpcNome: user.name,
        senha: newPassword,
      },
    });

    return res.json({
      email,
      newPassword,
      newPasswordHash,
    });
  },

};
