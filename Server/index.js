require('dotenv').config();
const express = require('express')
const cors = require('cors')

const app = express();
//middleware
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 5000

//import routes
const authRoute = require('./auth/index');
const apiRoute = require("./routes/routes")

//Route middlewares
app.use('/auth', authRoute)
app.use('/api', apiRoute)

//root route
app.get('/', (req, res) => res.send('Hello world!'));

app.listen(PORT, () => console.log(`Express now departing from http://localhost:${PORT}`))