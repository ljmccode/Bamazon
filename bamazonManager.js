var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection()
});

function afterConnection() {
    inquirer.prompt([
        {
            type: "list",
            name: "menu_options",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function (answer) {
        console.log(answer.menu_options)
        if (answer.menu_options === "View Products for Sale") {
            showItems()
        } else if (answer.menu_options === "View Low Inventory") {
            showLowInventory()
        } else if (answer.menu_options === "Add to Inventory") {
            updateInventory()
        } else if (answer.menu_options === "Add New Product") {
            addInventory()
        }
    })
}

function showItems() {
    connection.query("SELECT * FROM products", function (err, row) {
        if (err) throw err;
        for (var i = 0; i < row.length; i++) {
            console.log("***********************************");
            console.log("Product ID: " + row[i].item_id);
            console.log("Product Name: " + row[i].product_name);
            console.log("Department: " + row[i].department_name);
            console.log("Price: " + row[i].price.toFixed(2));
            console.log("Quantity: " + row[i].stock_quantity);
        }
    })
}

function showLowInventory() {
    connection.query("SELECT * FROM products", function (err, row) {
        if (err) throw err;
        for (var i = 0; i < row.length; i++) {
            if (row[i].stock_quantity < 5) {
                console.log("Product Name: " + row[i].product_name);
                console.log("Quantity left: " + row[i].stock_quantity);
            }
        }
    })
}

function updateInventory() {
    inquirer.prompt([
        {
            name: "item_id",
            message: "Which item_id would you like to update?"
        },
        {
            name: "how_much",
            message: "How much would you like to add to inventory?"
        }
    ]).then(function (answer) {
        connection.query("SELECT * FROM products", function (err, row) {
            if (err) throw err;
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: Number(row[answer.item_id - 1].stock_quantity) + Number(answer.how_much)
                    },
                    {
                        item_id: answer.item_id
                    }
                ], function (error, response) {
                })
            console.log("You have successfully added stock!")
        })
    })
}

function addInventory() {
    inquirer.prompt([
        {
            name: "product_name",
            message: "What is the product you would like to add?"
        },
        {
            name: "department",
            message: "What department does this product belong to?"
        },
        {
            name: "how_much",
            message: "How much does this product cost?"
        },
        {
            name: "how_many",
            message: "How much product would you like to add?"
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO products SET ?", 
        {
            product_name: answer.product_name,
            department_name: answer.department,
            price: answer.how_much,
            stock_quantity: answer.how_many
          },
        function (err, row) {
            if (err) throw err;
            console.log("Product inserted!")
        })
    })
}