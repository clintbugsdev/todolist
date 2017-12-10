<?php

/*
 * Require Database
 */
require_once (dirname(__FILE__) . "/Database.php");

class Model extends Database {

    protected $conn;
    protected $table_name;
    protected $id = "id"; // primary key

    function __construct($table_name = "", $id = "") {
        parent::__construct();

        $db = Database::getInstance();
        $this->conn = $db->getConnection();

        $this->table_name = $table_name;
        if ($id != "") {
            $this->id = $id;
        }
    }

    /**
     * @param int $id
     * @return single row of data
     */
    public function get_row($id) {
        // query
        $sql = 'SELECT * FROM ' . $this->table_name . ' WHERE ' . $this->id . ' = :' . $this->id;
        // prepare statement
        $stmt = $this->conn->prepare($sql);
        // bind the parameter $id
        $stmt->bindParam(':' . $this->id, $id, PDO::PARAM_INT);
        // execute statement
        $stmt->execute();
        //return an array of data
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function get_all() {
        // select all
        $sql = 'SELECT * FROM ' . $this->table_name;
        // prepare statement
        $stmt = $this->conn->prepare($sql);
        // execute statement
        $stmt->execute();
        //return an row of data
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function insert($values = array()) {
        // query
        $sql = 'INSERT INTO ' . $this->table_name . ' (' . implode(', ', array_keys($values)) . ',date_created) VALUES(';
        // set
        $values_ctr = 0; // set counter
        // loop $values
        foreach ($values as $key => $value) {
            // if new then statement should be not have COMMA(,)
            if (!$values_ctr) {
                $sql .= ':' . $key;
            } else {
                $sql .= ' ,:' . $key;
            }
            // increment set counter
            $values_ctr++;
        }
        $sql .= ',NOW())';
        // prepare statement
        $stmt = $this->conn->prepare($sql);
        // bind the parameter $values
        foreach ($values as $key => $value) {
            $stmt->bindValue(':' . $key, $value);
        }
        // execute statement
        return $stmt->execute() ? $this->conn->lastInsertId() : false;
    }

    public function update($id, $values = array()) {
        // query
        $sql = 'UPDATE ' . $this->table_name . ' SET';
        // values counter
        $values_ctr = 0;
        // loop $values
        foreach ($values as $key => $value) {
            // if new then statement should be not have COMMA(,)
            if (!$values_ctr) {
                $sql .= ' ' . $key . ' = :' . $key;
            } else {
                $sql .= ' ,' . $key . ' = :' . $key;
            }
            // increment set counter
            $values_ctr++;
        }
        $sql .= ' WHERE ' . $this->id . ' = :' . $this->id;
        // prepare statement
        $stmt = $this->conn->prepare($sql);
        // bind the parameter $id
        $stmt->bindParam(':' . $this->id, $id, PDO::PARAM_INT);
        // bind the parameter $values
        foreach ($values as $key => $value) {
            $stmt->bindValue(':' . $key, $value);
        }
        // execute statement
        return $stmt->execute();
    }

    public function delete($id) {
        // query
        $sql = 'DELETE FROM ' . $this->table_name . ' WHERE ' . $this->id . ' = :' . $this->id;
        // prepare statement
        $stmt = $this->conn->prepare($sql);
        // bind the parameter $id
        $stmt->bindValue(':' . $this->id, $id);
        // execute statement
        return $stmt->execute();
    }

}
