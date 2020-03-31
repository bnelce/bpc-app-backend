const bcrypt = require('bcrypt');
const Yup = require('yup');
const connection = require('../../database/connection');
const Mail = require('../../lib/Mail');

module.exports = {

  async index(req, res) {
    const users = await connection('users').select('*');
    return res.json(users);
  },

  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }


    const { name, email, password } = req.body;

    // verificando o email já existe na base de dados
    const userExists = await connection('users').where('email', email).select('*').first();
    // se existir da erro 400
    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe.' });
    }

    // encriptando a senha
    const password_hash = await bcrypt.hash(password, 8);

    await connection('users').insert({
      name,
      email,
      password_hash,
    });

    const user = { name, email, password };
    // disparo com bee-queue
    // await Queue.add(RegisterMail.key, {
    // user,
    // });


    Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Registro BPC App',
      template: 'register',
      context: {
        name: user.name,
      },
    });

    return res.json({ name, email, password_hash });
  },
};
