const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authentication = require('./middleware/authentication');
const errorHandler = require('./middleware/error-handler');

const app = express();
// trust ingress nginx
app.set('trust proxy', true);

const corsOptions = {
  origin:'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

dotenv.config();

// Check for JWT key
if (!process.env.SECRET_KEY) {
  throw new Error('JWT key not defined');
}

// Use Routes
app.use('/sign-up', require('./routes/sign-up'));
app.use('/sign-in', require('./routes/sign-in'));
app.use('/sign-out', require('./routes/sign-out'));
app.use('/current-user', authentication, require('./routes/current-user'));
app.use(errorHandler);

module.exports =  { app };
