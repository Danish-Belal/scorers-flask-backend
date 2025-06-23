/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
     pgm.addColumn('users', {
    name: { type: 'varchar(255)', notNull: false },
  });
};

exports.down = pgm => {
     pgm.dropColumn('users', 'name');
};
