require('dotenv').config();
const express = require('express')
const cors = require('cors')
// const jwt = require('jsonwebtoken')

const app = express();
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 5000

//import routes
const authRoute = require('./auth/index');

//Route middlewares
app.use('/auth', authRoute)


app.listen(PORT, () => console.log(`Express now departing from http://localhost:${PORT}`))