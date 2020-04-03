const connection = require('../../database/connection');

module.exports = {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await connection('files').insert({
      name,
      path,
    });

    return res.json(file);
  },
};
