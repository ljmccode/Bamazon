var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection()
  });
  
  function afterConnection() {
    connection.query("SELECT * FROM products", function(err, row) {
      if (err) throw err;
      // console.log(row);
      for (var i = 0; i<row.length; i++) {
        console.log("***********************************");
          console.log("Product ID: " + row[i].item_id);
          console.log("Product Name: " + row[i].product_name);
          console.log("Department: " + row[i].department_name);
          console.log("Price: " + row[i].price);
          console.log("Quantity: " + row[i].stock_quantity);        
        }
        transaction();
        connection.end();
    })
}

function transaction() {
    inquirer.prompt([
        {
            name: "Product ID",
            message: "What is the ID of the product you would like to buy?"
        },
        {
            name: "Quantity",
            message: "How many units would you like to buy?"
        }
    ]).then(function(answers) {

    })
}