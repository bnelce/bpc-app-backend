
const Mail = require('../../lib/Mail');


class RegisterMail {
  get key() {
    return 'RegisterMail';
  }

  async handle({ data }) {
    console.log('handle data');
    const { user } = data;

    console.log('A fila executou!');

    Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Registro BPC App',
      template: 'register',
      context: {
        name: user.name,
        teste: 'Valor',
      },
    });
  }
}

module.exports = new RegisterMail();
