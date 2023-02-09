const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(function (req, res, next){

    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.header('Access-Control-Allow-Credentials', true);

    next();
});


const orderRoutes = require('./routes/orders');

app.use('/order', orderRoutes);

app.listen(3000);