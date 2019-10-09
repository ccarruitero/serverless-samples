const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

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

app.get('/api/express', function (req, res) {
  res.send('Secured Resource');
});

// app.listen(port, () => console.log(`app listening on port ${port}!`));

module.exports = app;

/*
https://auth0.com/docs/quickstart/spa/vanillajs/02-calling-an-api
****^
https://auth0.com/docs/quickstart/spa/vanillajs

https://auth0.com/docs/quickstart/backend/nodejs/01-authorization
*/
