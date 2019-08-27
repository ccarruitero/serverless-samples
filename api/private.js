const Hapi = require('hapi');
const Joi = require('joi');
const jwt = require('hapi-auth-jwt2');

const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 3010,
  routes: {
    cors: {
      // change this for production
      origin: ['*']
    }
  }
});

const registerRoutes = () => {
  server.route({
    method: 'GET',
    path: '/api/private',
    config: {
      auth: 'jwt',
      handler: (req, res) => {
        res({
          message: 'Hello from a private endpoint!'
        });
      }
    }
  });
};

const validateUser = (decoded, request, callback) => {
  // This is a simple check that the `sub` exists
  // Modify it to suit the needs of your application
  if (decoded && decoded.sub) {
    if (decoded.scope)
      return callback(null, true, {
        scope: decoded.scope.split(' ')
      });

    return callback(null, true);
  }

  return callback(null, false);
};

server.register(jwt, err => {
  if (err) throw err;
  server.auth.strategy('jwt', 'jwt', 'required', {
    // verify the access token against local secret key
    key: process.env.AUTH0_HS256_SECRET,
    verifyOptions: {
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['HS256']
    },
    validateFunc: validateUser
  });
  registerRoutes();
});

server.start(err => {
  if (err) throw err;
  console.info(`Server started at ${server.info.uri}`);
});

module.exports = server;
