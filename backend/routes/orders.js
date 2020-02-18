module.exports = {
    pizzaOrderPage: (req, res) => {
        let query = "SELECT * FROM `orders` ORDER BY id ASC"; // query database to get all the pizzas
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/orders');
            }
            res.render('orders.ejs', {
                title: 'Pizza Orders',
                message: 'Pizza orders',
                orders: result
            });
        });
    },

    getOrdersList: (req, res) => {
        let query = "SELECT * FROM `orders` ORDER BY id ASC"; // query database to get all the players


        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.end(JSON.stringify(result));
            // res.render('index.ejs', {
            //     title: 'Pizza page',
            //     pizzas: result
            // });
        });

    },

    addOrderPage: (req, res) => {
        let query = "SELECT * FROM `pizza` ORDER BY id ASC"; // query database to get all the pizzas
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('order-views/add-order.ejs', {
                title: 'Pizza Orders',
                message: 'Pizza orders',
                pizzas: result
            });
        });
    },

    addOrder: (req, res) => {
        let message = '';
        let pizzaName = req.body.pizzaName;
        let customer_name = req.body.customer_name;
        let customer_adress = req.body.customer_adress;
        let gps_latitude = req.body.gps_latitude;
        let gps_longitude = req.body.gps_longitude;
        let order_amount = req.body.order_amount;
        
        let query = "INSERT INTO `orders` (pizzaName, customer_name, customer_adress, gps_latitude, gps_longitude, order_amount) VALUES ('" + pizzaName + "', '" + customer_name + "', '" + customer_adress + "', '" + gps_latitude + "', '" + gps_longitude + "', '" + order_amount + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/orders');
        });
    },

    editOrderPage: (req, res) => {
        let orderId = req.params.id;
        //let query = "SELECT * FROM `orders` WHERE id = '" + orderId + "' ";
        let query = "SELECT orders.id, orders.pizzaName, orders.customer_name, orders.customer_adress, orders.gps_latitude, orders.gps_longitude, orders.order_amount, pizza.pizza_name, pizza.pizza_price FROM orders LEFT JOIN pizza ON orders.id='" + orderId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('order-views/edit-order.ejs', {
                title: 'Edit  Order',
                order: result[0],
                pizzas: result,
                message: 'Edit order'
            });
        });
    },
    editOrder: (req, res) => {
        let orderId = req.params.id;
        let pizzaName = req.body.pizzaName;
        let customer_name = req.body.customer_name;
        let customer_adress = req.body.customer_adress;
        let gps_latitude = req.body.gps_latitude;
        let gps_longitude = req.body.gps_longitude;
        let order_amount = req.body.order_amount;

        let query = "UPDATE `orders` SET `pizzaName` = '" + pizzaName + "', `customer_name` = '" + customer_name + "', `customer_adress` = '" + customer_adress + "', `gps_latitude` = '" + gps_latitude + "', `gps_longitude` = '" + gps_longitude + "', `order_amount` = '" + order_amount + "' WHERE `orders`.`id` = '" + orderId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/orders');
        });
    },
    deleteOrder: (req, res) => {
        let orderId = req.params.id;
        let deleteOrderQuery = 'DELETE FROM orders WHERE id = "' + orderId + '"';

        db.query(deleteOrderQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            res.redirect('/orders');
        });
    }
}
