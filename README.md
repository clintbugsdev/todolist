# TODO List

A simple TODO List Web Application

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
PHP 5.4 or later, MySQL
```

### Installing

Step 1: Download or clone this repository

```
git clone https://github.com/clintbugsdev/todolist.git
```

Step 2: Find and import the database dump file from the "database" folder

```
todolist_db.sql
```

Step 3: Change the database connection string credentials for your local machine. Found at the "models/library/Database.php"

```
$host = 'localhost';
$db = 'todolist_db';
$user = 'todolist_user';
$pwd = 'todolist_pwd';
```


## Built With

* [Route](http://nezamy.com/route) - Fast, flexible routing for PHP, enabling you to quickly and easily build RESTful web applications. 
* [JQuery](https://jquery.com/)
* [Bootstrap](https://getbootstrap.com/)
