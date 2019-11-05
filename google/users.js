const express = require('express');
const app = express();

app.use('/users/:id', getUser);
app.use('/users/', getAllUsers);
