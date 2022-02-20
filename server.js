const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const exp = require('constants');

// init express
const app = express();

// env
dotenv.config({
    path:'./config.env'
});

// logger setup
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'));
}


// load server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})