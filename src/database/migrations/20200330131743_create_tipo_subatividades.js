exports.up = function (knex) {
  return knex.schema.createTable('tipo_subatividades', (table) => {
    table.increments();
    table.string('descricao').notNullable();
    table.integer('atividade_id').notNullable();
    table.foreign('atividade_id').references('id').inTable('tipo_atividades');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tipo_subatividades');
};
