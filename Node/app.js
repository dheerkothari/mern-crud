const express = require('express')
const app = express();
const cors = require('cors')

app.use(express.json())
app.use(cors())

require('dotenv').config()

const dbConfig = require('./config/dbConnection');

//const User = require('./Models/user')

app.listen(process.env.PORT, async () => {

    console.log(`1, Server running at port no. ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
    require('./routes')(app); // API route 
    dbConfig.connectDb(); // DB connect and authenticate
});