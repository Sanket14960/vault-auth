const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const cors = require('cors')

const errorHandler = require('./middleware/error-handler')

const app = express()

const corsOptions = {
  origin:'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json());
dotenv.config();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo

const start = async () => {
  await mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
}

// Use Routes
app.use(errorHandler);
app.use('/sing-up', require('./routes/sign-up'))
app.use('/sign-in', require('./routes/sign-in'))


const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));