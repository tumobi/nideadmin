'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(20),
    password: STRING(64),
    password_salt: STRING(6),
    avatar: STRING(255),
    created_at: DATE,
    updated_at: DATE,
    deleted_at: DATE,
  });

  User.findByUsername = async username => {
    return await User.findOne({
      where: {
        username,
      },
    });
  };

  return User;
};
