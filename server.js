require('dotenv').config()

const express = require("express");
const app = express();

var mongoose = require('mongoose');
mongoose.connect(process.env.CLOUD_MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useUnifiedTopology: true, 
  serverSelectionTimeoutMS: 5000
}).catch(err => console.log(err.reason));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected!')
});

app.set('view engine', 'pug');

var fileUpload = require('express-fileupload');
app.use(fileUpload({
  useTempFiles: true
}));

var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'nnhungcoderx', 
  api_key: '874846159413379', 
  api_secret: 'LnPTZP8dDOKQVlIup17uxKACmto' 
});

var bookRoute = require('./routes/books.route');
var userRoute = require('./routes/users.route');
var authRoute = require('./routes/auth.route')
var transactionRoute = require('./routes/transactions.route');
var blogRoute = require('./routes/blog.route');
var cartRoute = require('./routes/cart.route');
var apiTransaction = require('./api/routers/transaction.router');
var apiLogin = require('./api/routers/user.router');
var apiBook = require('./api/routers/book.route');

var sessionMiddleware = require('./middlewares/session.middleware');

var cookieParser = require('cookie-parser')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));

app.use(cookieParser(process.env.SECRET_COOKIES));
app.use(sessionMiddleware);

app.get('/', function(req, res) {
 res.render('index');
})
app.use('', authRoute);
app.use('/book', bookRoute);
app.use('/user', userRoute);
app.use('/transactions', transactionRoute);
app.use('/blog', blogRoute);
app.use('/cart', cartRoute);
app.use('/api', apiTransaction);
app.use('/api', apiLogin);
app.use('/api', apiBook);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on " + process.env.PORT);
});