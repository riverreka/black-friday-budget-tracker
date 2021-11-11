const express = require('express');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

// set "db" file here
const filePath = path.join(__dirname, 'data.csv');
const port = 8000;

const app = express();
app.use(express.static(path.join(__dirname, './build')));
// parse incoming requests body as JSON
app.use(express.json());

const saveToFile = data => {
  fs.writeFile(filePath, JSON.stringify(data), () => '');
};

// server side dataStore array
let dataStore;
try {
  dataStore = JSON.parse(fs.readFileSync(filePath, 'utf8'));
} catch (e) {
  dataStore = {};
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

app.get('/api', (req, res) => {
  const newUserId = uuid.v4();
  res.json(newUserId);
});

app.get('/api/:userId', (req, res) => {
  const userData = dataStore[req.params.userId];
  if (userData) {
    res.json(userData);
  } else {
    res.sendStatus(404);
  }
});

app.post('/api/:userId', req => {
  dataStore[req.params.userId] = req.body;
  saveToFile(dataStore);
});

app.listen(port, () => {
  console.log(`Server is listenning at http://localhost:${port}`);
});
