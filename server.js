import express from 'express';
import path from 'path';
import fs from 'fs';
import uuid from 'uuid';

// file path here

const filePath = './data.csv';

const app = express();
app.use(express.static(path.join(__dirname, './build')));
app.use(express.json());

// dataStore array here

const dataStore = JSON.parse(fs.readFileSync(filePath, 'utf8'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

app.get('/api', (req, res) => {
  const newUserId = uuid.v4();
  res.send(newUserId);
});

app.get('/api/:userId', (req, res) => {
  const userData = dataStore.filter(d => d.id === req.params.userID);
  res.send(userData.data);
});

app.post('/', (req, res) => {
  dataStore.push({ id: req.params.userId, date: req.params.body });
});

app.listen(8000);
