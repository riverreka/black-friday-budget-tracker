// const express = require('express');

import express from 'express';
import path from 'path';

const app = express();
app.use(express.static(path.join(__dirname, './build')));

app.get('/', function (req, res) {
  res.send('DEFAULT-ROUTE')
});

app.listen(8000);
