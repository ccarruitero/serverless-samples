const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const jwt = require('hapi-auth-jwt2');

const init = async () => {
  const server = new Hapi.Server({
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

  const validateUser = async (decoded, request) => {
    // This is a simple check that the `sub` exists
    // Modify it to suit the needs of your application
    if (decoded && decoded.sub) {
      if (decoded.scope) {
        return {
          isValid: true,
          scope: decoded.scope.split(' ')
        };
      }

      return { isValid: true };
    }

    return { isValid: false };
  };

  await server.register(jwt);
  server.auth.strategy('jwt', 'jwt', {
    // verify the access token against local secret key
    key: process.env.AUTH0_HS256_SECRET,
    verifyOptions: {
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['HS256']
    },
    validate: validateUser
  });
  server.auth.default('jwt');

  registerRoutes();

  await server.start();
  console.info(`Server started at ${server.info.uri}`);

  return server;
};

const app = init();

module.exports = app;
