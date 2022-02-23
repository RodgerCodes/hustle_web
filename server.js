const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const { engine } = require('express-handlebars');
const ConnectDB = require('./config/db')

// init express
const app = express();

// env
dotenv.config({
    path:'./config.env'
});

app.use(express.json());
app.use(express.urlencoded({extended:false}))

// db
ConnectDB();


// view setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');


app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use("/", require('./routes/index'))


// logger setup
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'));
}


// load server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})