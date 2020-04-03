exports.up = function (knex) {
  return knex.schema.table('users', (t) => {
    t.integer('avatar_id').notNull().defaultTo(0);
    t.foreign('avatar_id').references('id').inTable('files');
  });
};

exports.down = function (knex) {
  return knex.schema.table('users', (t) => {
    t.dropColumn('avatar_id');
  });
};
