const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const {getHomePage} = require('./routes/index');
const {addPizzaPage, addPizza, editPizzaPage, editPizza, deletePizza, getPizzaList} = require('./routes/pizza');
const {pizzaOrderPage, addOrderPage, addOrder, editOrderPage, editOrder, deleteOrder, getOrdersList} = require('./routes/orders');
const port = process.env.PORT || 2000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pizza-app',
    port: 3306
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload


// routes for the app

app.get('/', getHomePage);
app.get('/add-pizza', addPizzaPage);
app.post('/add-pizza', addPizza);
app.get('/edit-pizza/:id', editPizzaPage);
app.post('/edit-pizza/:id', editPizza);
app.get('/delete-pizza/:id', deletePizza);

app.get('/orders', pizzaOrderPage);
app.get('/add-order', addOrderPage);
app.post('/add-order', addOrder);
app.get('/edit-order/:id', editOrderPage);
app.post('/edit-order/:id', editOrder);
app.get('/delete-order/:id', deleteOrder);

app.get('/pizza-list', getPizzaList);
app.get('/orders-list', getOrdersList);





// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
