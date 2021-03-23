const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authentication = require('./middleware/authentication');

const app = express()

app.use(express.json());

dotenv.config();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log("Database failed to connect."));

// Use Routes
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));