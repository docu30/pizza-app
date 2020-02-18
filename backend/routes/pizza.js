const fs = require('fs');

module.exports = {
    addPizzaPage: (req, res) => {
        res.render('pizza-views/add-pizza.ejs', {
            title: "Pizza app | Add a new pizza"
            ,message: ''
        });
    },
    getPizzaList: (req, res) => {
        let query = "SELECT * FROM `pizza` ORDER BY id ASC"; // query database to get all the players


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
    addPizza: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let pizza_name = req.body.pizza_name;
        let description = req.body.description;
        let pizza_price = req.body.pizza_price;

        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = pizza_name + '.' + fileExtension;

        

        let pizzaNameQuery = "SELECT * FROM `pizza` WHERE pizza_name = '" + pizza_name + "'";

        db.query(pizzaNameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'This pizza already exists';
                res.render('pizza-views/add-pizza.ejs', {
                    message,
                    title: 'Add a new pizza'
                });
            } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // send the pizza's details to the database
                        let query = "INSERT INTO `pizza` (pizza_name, description, pizza_price, image) VALUES ('" +
                            pizza_name + "', '" + description + "', '" + pizza_price + "', '" + image_name + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('pizza-views/add-pizza.ejs', {
                        message,
                        title: 'Pizza App' | 'Add a new pizza'
                    });
                }
            }
        });
    },
    editPizzaPage: (req, res) => {
        let pizzaId = req.params.id;
        //let query = "SELECT players.id, players.first_name, players.last_name, players.position, players.number, players.image, players.user_name, player_position.position_name FROM players INNER JOIN player_position ON players.id=player_position.id AND players.id='" + playerId + "'";
        //let query = "SELECT pizza.id, pizza.pizza_name, pizza.description, pizza.pizza_price, pizza.number, pizza.image, pizza.user_name, player_position.position_name FROM players LEFT JOIN player_position ON players.id='" + playerId + "'";
        
        let query = "SELECT * FROM `pizza` WHERE id = '" + pizzaId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('pizza-views/edit-pizza.ejs', {
                title: 'Edit  Pizza'
                ,pizza: result[0]
                ,message: ''
            });
        });


    },
    editPizza: (req, res) => {
        let pizzaId = req.params.id;
        let pizza_name = req.body.pizza_name;
        let description = req.body.description;
        let pizza_price = req.body.pizza_price;

        let query = "UPDATE `pizza` SET `pizza_name` = '" + pizza_name + "', `description` = '" + description + "', `pizza_price` = '" + pizza_price + "' WHERE `pizza`.`id` = '" + pizzaId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deletePizza: (req, res) => {
        let pizzaId = req.params.id;
        let getImageQuery = 'SELECT image from `pizza` WHERE id = "' + pizzaId + '"';
        let deletePizzaQuery = 'DELETE FROM pizzza WHERE id = "' + pizzaId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deletePizzaQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        });
    }
    
};