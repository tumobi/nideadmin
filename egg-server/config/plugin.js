'use strict';

// had enabled by egg
// exports.static = true;
exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.cache = {
  enable: true,
  package: 'egg-cache',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};
