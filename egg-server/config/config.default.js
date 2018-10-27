'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1540625711644_3325';

  // add your config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cors = {
    origin: 'http://localhost:8080',
    allowHeaders: 'Authorization,Origin, X-Requested-With, Content-Type, Accept, X-Admin-Token, X-Admin-Version',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  };

  config.jwt = {
    secret: 'f40499b377933f39cc9e7634323669e0',
  };

  return config;
};
