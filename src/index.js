let express = require('express');

const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const mysql_store = require('express-mysql-session');
const { database } = require('./keys');
const path = require('path');
const passport = require('passport');
const { engine } = require('express-handlebars');

//iniciar
const app = express();
require('./lib/passports')

// configs
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.engine('hbs', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}));
app.set('view engine', 'hbs')

// Utils
app.use(session({
  secret: 'JuandaDCmysql_SErver_session',
  resave: false,
  saveUninitialized: false,
  store: new mysql_store(database)
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());  

//Global variable
app.use((req,res,next)=>{
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');
  app.locals.user = req.user;
  next()
})
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// Rutas
app.use(require('./routes/indice'));

app.use(require('./routes/autendication'));
app.use('/users', require('./routes/users'));

// Public config
app.use(express.static(path.join(__dirname, 'public')))

// listen
app.listen(app.get('port'), () =>{
  console.log('Sever online port', app.get('port'))
})
