const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const appRoutes = require('./Routers/app');
app.use(bodyParser.urlencoded({extended: false}));

app.use(appRoutes);
app.get("/",(req,res,next) => {
    res.send('<h1 >Hello from Chat app </h1>');
});

app.listen(4000);

