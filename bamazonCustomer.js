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
  connection.query("SELECT * FROM products", function (err, row) {
    if (err) throw err;
    // console.log(row);
    for (var i = 0; i < row.length; i++) {
      console.log("***********************************");
      console.log("Product ID: " + row[i].item_id);
      console.log("Product Name: " + row[i].product_name);
      console.log("Department: " + row[i].department_name);
      console.log("Price: " + row[i].price.toFixed(2));
      console.log("Quantity: " + row[i].stock_quantity);
    }
    inquirer.prompt([
      {
        name: "item_id",
        message: "What is the ID of the product you would like to buy?"
      },
      {
        name: "quantity",
        message: "How many units would you like to buy?"
      }
    ]).then(function (answer) {
      var customerWants = answer.quantity;
      var quantityAvailable = row[answer.item_id - 1].stock_quantity;
      if (customerWants > quantityAvailable) {
        console.log("Insuffient quantity!")
      } else {
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: (quantityAvailable - customerWants)
            },
            {
              item_id: answer.item_id
            }
          ], function(error, response) {
            var itemPrice = row[answer.item_id - 1].price;
            console.log("This will cost $" + (customerWants * itemPrice).toFixed(2));
          })
      }
      connection.end();
    })
  })
}
