const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const { engine, create } = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const ConnectDB = require('./config/db')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override');
const Auth = require('./config/Auth/localStrategy');


// init express
const app = express();

// env
dotenv.config({
    path:'./config.env'
});

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))

// db
ConnectDB();

Auth(passport);
let hour = 7200000;
app.use(session({
    resave:true,
    saveUninitialized:false,
    secret:process.env.SECRET,
    cookie: {
        expires: new Date(Date.now(+hour)),
        maxAge: hour,
      },
    store:MongoStore.create({
        mongoUrl:process.env.MONGO_URL
    })
}))
app.use(passport.initialize())
app.use(passport.session());


// view setup
const  { truncate }= require('./helpers/hbs');
const hbs = create({
runtimeOptions:{
        allowProtoPropertiesByDefault:true,
        allowProtoMethodsByDefault:true
    },
    helpers:{
        truncate
    }
})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use("/", require('./routes/index'));
app.use('/home', require('./routes/freelancer'));
app.use('/client', require('./routes/client'));


// logger setup
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'));
}


// load server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})