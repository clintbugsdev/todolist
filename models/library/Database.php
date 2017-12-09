<?php
/**
 * MySQL - PDO database; only one connection is allowed. 
 */
class Database {

    private $_connection;
    // Store the single instance.
    private static $_instance;

    /**
     * Get an instance of the Database.
     * @return Database 
     */
    public static function getInstance() {
        if (!self::$_instance) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * Constructor.
     */
    public function __construct() {
        try {
            $host = 'localhost';
            $db = 'todolist_db';
            $user = 'todolist_user';
            $pwd = 'todolist_pwd';
            $this->_connection = new PDO("mysql:host=$host;dbname=$db", $user, $pwd);
        } catch (PDOException $e) {
            echo 'Cannot connect to database';
            exit;
        }
    }

    /**
     * Empty clone magic method to prevent duplication. 
     */
    private function __clone() {
        
    }

    /**
     * Get the mysqli connection. 
     */
    public function getConnection() {
        return $this->_connection;
    }

}
