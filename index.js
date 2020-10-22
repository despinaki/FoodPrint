require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express();
const path = require("path")
const PORT = process.env.PORT || 5000

//middleware
app.use(cors());
app.use(express.json())

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "Client/public")))
}

//import routes
const authRoute = require('./auth/index');
const apiRoute = require("./routes/routes")

//Route middlewares
app.use('/auth', authRoute)
app.use('/api', apiRoute)

//root route
app.get('/', (req, res) => res.send('Hello world!'));
//catch unknown routes
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "Client/public/index.html"))
})

app.listen(PORT, () => console.log(`Express now departing from http://localhost:${PORT}`))