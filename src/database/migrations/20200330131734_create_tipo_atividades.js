exports.up = function (knex) {
  return knex.schema.createTable('tipo_atividades', (table) => {
    table.increments();
    table.string('descricao').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tipo_atividades');
};
