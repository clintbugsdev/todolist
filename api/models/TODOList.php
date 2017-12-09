<?php
/*
 * Model
 */
require_once (dirname(__FILE__) . "/library/Model.php");

class TODOList extends Model {

    function __construct() {
        parent::__construct('todolist', 'id');
    }
}
