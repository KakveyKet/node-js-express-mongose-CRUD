require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express');
const app = express();
const port = 5000 || process.env.port;
app.use(express.json())


app.use('/', require('./server/routes/main'))
app.listen(port, () => {
    console.log(`Server start on port ${port}`);
})





mongoose.connect("mongodb+srv://kakveyket408:kakveyket408@cluster0.0ytbmu6.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log('connect to cluster')
}).catch(() => console.log('not connected to cluster'))

