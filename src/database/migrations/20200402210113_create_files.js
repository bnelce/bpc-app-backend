exports.up = function (knex) {
  return knex.schema.createTable('files', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('path').notNullable();
    table.date('created_at');
    table.date('updated_at');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('files');
};
