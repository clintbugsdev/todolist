<?php
/*
 * Model
 */
require_once (dirname(__FILE__) . "/library/Model.php");

class Items extends Model {

    function __construct() {
        parent::__construct('items', 'id');
    }
}
