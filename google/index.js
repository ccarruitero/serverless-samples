const express = require('express');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const app = express();

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH0_SECRET
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_DOMAIN,
  algorithms: ['RS256']
});

app.use(jwtCheck);

exports.auth = app;

exports.background = (data, context) => {
};
