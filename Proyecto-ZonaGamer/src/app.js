var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookies = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const cors = require('cors');

// var indexRouter = require('./routes/home');
const homeRouter = require('./routes/home');
const userRouter = require('./routes/users');
const productsRouter = require('./routes/products');

const homeApiRouter = require('./routes/api/homeApi');
const userApiRouter = require('./routes/api/usersApi');
const productsApiRouter = require('./routes/api/productsApi');
const categorysApiRouter = require('./routes/api/categorysApi');

const app = express();

const userLoggedMidlleware = require('./middlewares/userLoggedMidlleware');
const { cookie } = require('express-validator');

const config = {
    application: {
        cors: {
            server: [
                {
                    origin: "localhost:3000", //servidor que deseas que consuma o (*) en caso que sea acceso libre
                    credentials: true
                }
            ]
        }
    }
}

app.use(session({
    secret: 'Es secreto',
    resave: false,
    saveUninitialized: false
}));

app.use(cookies());
app.use(userLoggedMidlleware);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));
app.use(cors(config.application.cors.server));

app.use('/', homeRouter);
app.use('/users', userRouter);
app.use('/products', productsRouter);


app.use('/api', homeApiRouter);
app.use('/api/usersApi', userApiRouter);
app.use('/api/productsApi', productsApiRouter);
app.use('/api/categorysApi', categorysApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.path = req.path;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);
res.render('error');
});


module.exports = app;

