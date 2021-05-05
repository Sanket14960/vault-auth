const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const cors = require('cors')
const authentication = require('./middleware/authentication');

const app = express()
// trust ingress nginx
app.set('trust proxy', true);

const corsOptions = {
  origin:'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json());

dotenv.config();

// DB Config
const db = require('./config/keys').mongoURI;
const errorHandler = require('./middleware/error-handler');

// Check for JWT key
if (!process.env.SECRET_KEY) {
  throw new Error('JWT key not defined')
}

// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use Routes

app.use('/sign-up', require('./routes/sign-up'))
app.use('/sign-in', require('./routes/sign-in'))
app.use('/sign-out', require('./routes/sign-out'))
app.use('/current-user', authentication, require('./routes/current-user'))
app.use(errorHandler)


const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));