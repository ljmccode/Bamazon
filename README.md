## Bamazon App

### Link to Video Walk-through:
https://drive.google.com/file/d/1CoECc4yJeAR9-lmtrSS7lyDA3cDiNaMl/view?usp=sharing

### Description
Welcome to Bamazon! This is a useful storefront CLI application for both consumers and managers to buy, sell, and view products. 

#### Bamazon Customer
As a customer, running the node application `bamazonCustomer.js` will display all of the items available for purchase including their item ID, product name, and price. The customer will then be asked for the ID of the product they would like to purchase and how many units they would like to buy. Once the customer places the order, our application will check the inventory levels for that particular product. If the customer is trying to purchase more than what is available, it will respond with "Insufficient quantity!" Otherwise, the application will respond "Transaction complete!" and give the customer the total price of their purchase.

#### Bamazon Manager
As a manager, running the node applicaiton `bamazonManager.js` will display a list of menu items:
* View Products for Sale
* View Low Inventory
* Add to Inventory
* Add New Product

If a manager selects `View Products for Sale`, the app will list every available item's ID, name, price, and quantity. <br/> 
If a manager selects `View Low Inventory`, the app will list all items with an inventory count less than 5. <br/>
If a manager selects `Add to Inventory`, the app will display a prompt that will allow the user to add more stock to any item currently in the store. <br/>
If the manager selects `Add New Product`, it will allow the manager to add a completely new product to the store. <br/>

### Languages and Tools Used
* MySQL
* Node.js
* Inquirer
* Javascript
