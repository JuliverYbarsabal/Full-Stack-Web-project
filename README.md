# Full-Stack-Web-project
Front end and back end web project

Software used: Visual studio code

Use only the following technologies: HTML5, CSS, JavaScript, PHP, MySQL Database, jQuery, Ajax,.

online trading company that sells many different products using its company web and/or mobile application

functionality includes:

  - cart system / allows registered user to purchase products
  - navigation bar
  - access defferentiate for the application: unregistered users, registered customers, and support      staff
  -  Search by keyboard / Search by browsing
  -  mobile / web view

Functional Requirement – Basic:
  -  Our website contains basic information about the company including product details
  -  It is a one-page application and has a consistent navigation system to switch views into different pages.
  -  Includes a help page that provides instruction on how to use and navigate through our program.
  -  Our Website uses HTML5's structural elements to define the overall logical structure of the      front end of the application and use CSS to 
define the visual layout of those structural elements.

Search Facility:
  -  The raw product/service data must be stored in the MySQL database on the server.
  -  Validates user search if match is not found within the table and outputs a re-enter statement stating that the product doesn’t exist .
  -  Product page includes two level of searches:
  -  First level: Allows users to input by keywords, where an entry is retrieved from the database if the user's search term matches any 
text in any product-related fields in the entry.
  -  Second level: Allows users to browse where the user can go through different categories of products/services
 
Functional Requirement – Advance:
  -  Unregistered User:
pg. 8
- Visitors without authentication are given access to all basic functionalities specified, including search products/services by 
keywords and by browsing.
  -  Registered Customers
  -  Registered customer has an account in the application. authenticated before access is granted. After authenticated the customer 
can now modify his or her personal details such as name, address, phone number and email address.
  -  Able to submit order.
  -  If user press ‘purchase’ the server-side command will decide if purchase was successful and if not, it will return an ERROR 
message meaning not enough quantity are in stock.
  -  If order confirmed within the database, the quantity of that product will decrease by the amount of quantity product user ordered.
  -  Anyone can register an account with the application to become a customer of the company without the involvement of the 
company support staff.

Support Staff:
  -  staff member has an account with the application.
  -  can access any customer account without using that customer's password.
  -  modify product/service details in the database, such as adding a new product to the database, removing an existing product from 
the database or changing the details of an existing produc
