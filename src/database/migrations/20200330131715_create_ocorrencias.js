exports.up = function (knex) {
  return knex.schema.createTable('ocorrencias', (table) => {
    table.increments();
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('ocorrencias');
    table.string('solicitante_nome').notNullable();
    table.string('solicitante_celular').notNullable();
    table.string('ocorrencia_local').notNullable();
    table.integer('tipo_atividade').notNullable();
    table.integer('tipo_subatividade').notNullable();
    table.date('ocorrencia_data').notNullable();
    table.time('ocorrencia_hora_inicial').notNullable();
    table.time('ocorrencia_hora_final').notNullable();
    table.text('ocorrencia_historico').notNullable();
    table.text('ocorrencia_dados').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('incidents');
};
