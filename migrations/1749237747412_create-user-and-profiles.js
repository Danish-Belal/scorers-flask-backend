/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('users', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
    email: { type: 'varchar(255)', notNull: true, unique: true },
    password: { type: 'varchar(255)', notNull: false }, // nullable for Google/GitHub
    provider: { type: 'varchar(50)', notNull: true }, // 'email' | 'google' | 'github'
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') }
  });

  // Profiles table
  pgm.createTable('profiles', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
    user_id: {
      type: 'uuid',
      notNull: true,
      references: '"users"(id)',
      onDelete: 'cascade'
    },
    linkedin: { type: 'varchar(255)' },
    github: { type: 'varchar(255)' },
    leetcode: { type: 'varchar(255)' },
    gitlab: { type: 'varchar(255)' },
    gfg: {type: 'varchar(255)'},
    others: { type: 'varchar(255)' }
  });
};

exports.down = pgm => {
    pgm.dropTable('profiles');
    pgm.dropTable('users');
};
