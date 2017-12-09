<?php

define('DS', DIRECTORY_SEPARATOR, true);
define('BASE_PATH', __DIR__ . DS, TRUE);

require BASE_PATH . 'vendor/autoload.php';
require BASE_PATH . 'models/TODOList.php';

$app = System\App::instance();
$app->request = System\Request::instance();
$app->route = System\Route::instance($app->request);
$route = $app->route;
/*
 * Home
 */
$route->get('/', function() {
    echo "<h3>Welcome to the TODO list API</h3>version 1.0";
});
/*
 * TODO List
 */
$route->get('/todolist', function() {
    $todolist = new TODOList();
    $data = $todolist->get_all();
    if (empty($data)) {
        echo json_encode(['status' => 'Error', 'message' => 'No result']);
    } else {
        echo json_encode(['status' => 'Success', 'data' => $data]);
    }
});
/*
 * Show Item
 */
$route->get('/todolist/?', function($id) {
    $todolist = new TODOList();
    $data = $todolist->get_row($id);
    if (empty($data)) {
        echo json_encode(['status' => 'Error', 'message' => 'No result']);
    } else {
        echo json_encode(['status' => 'Success', 'data' => $data]);
    }
});
/*
 * Add New Item
 */
$route->post('/todolist', function() {
    $input = app('request')->body;
    $todolist = new TODOList();
    if (empty($input['item'])) {
        echo json_encode(['status' => 'Error', 'message' => 'Item is required']);
    } else {
        $result = $todolist->insert(['item' => $input['item']]);
        if ($result) {
            echo json_encode(['status' => 'Success']);
        } else {
            echo json_encode(['status' => 'Error', 'message' => 'Something went wrong']);
        }
    }
});
/*
 * Update Item
 */
$route->patch('/todolist/?', function($id) {
    $input = app('request')->query;
    $todolist = new TODOList();
    if (empty($input['item'])) {
        echo json_encode(['status' => 'Error', 'message' => 'Item is required']);
    } else {
        $result = $todolist->update($id, ['item' => $input['item']]);
        if ($result) {
            echo json_encode(['status' => 'Success']);
        } else {
            echo json_encode(['status' => 'Error', 'message' => 'Something went wrong']);
        }
    }
});
/*
 * Update Item
 */
$route->delete('/todolist/?', function($id) {
    $todolist = new TODOList();
    $result = $todolist->delete($id);
    if ($result) {
        echo json_encode(['status' => 'Success']);
    } else {
        echo json_encode(['status' => 'Error', 'message' => 'Something went wrong']);
    }
});
/*
 * Check/Uncheck Done Item
 */
$route->post('/todolist/?/done', function($id) {
    $input = app('request')->body;
    $todolist = new TODOList();
    $done = !empty($input['done']) ? true : false;
    $result = $todolist->update($id, ['done' => $done]);
    if ($result) {
        echo json_encode(['status' => 'Success']);
    } else {
        echo json_encode(['status' => 'Error', 'message' => 'Something went wrong']);
    }
});
$route->end();
