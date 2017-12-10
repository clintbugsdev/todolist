<?php
/*
 * Database Connection Credentials
 */
define('HOST', 'localhsot');
define('DB', 'todolist_db');
define('DBUSER', 'todolist_user');
define('DBPWD', 'todolist_pwd');

define('DS', DIRECTORY_SEPARATOR, true);
define('BASE_PATH', __DIR__ . DS, TRUE);

require BASE_PATH . 'vendor/autoload.php';
require BASE_PATH . 'models/Items.php';

$app = System\App::instance();
$app->request = System\Request::instance();
$app->route = System\Route::instance($app->request);
$route = $app->route;
/*
 * Home
 */
$route->get('/', function() {
    ob_start();
    include('view.php');
    $var = ob_get_contents();
    ob_end_clean();
    echo $var;
});
/*
 * TODO List
 */
$route->get('/api/v1/todolist', function() {
    $items = new Items();
    $data = $items->get_all();
    if (empty($data)) {
        echo json_encode(['status' => 'Error', 'message' => 'No result']);
    } else {
        echo json_encode(['status' => 'Success', 'data' => $data]);
    }
});
/*
 * Show Item
 */
$route->get('/api/v1/todolist/?', function($id) {
    $items = new Items();
    $data = $items->get_row($id);
    if (empty($data)) {
        echo json_encode(['status' => 'Error', 'message' => 'No result']);
    } else {
        echo json_encode(['status' => 'Success', 'data' => $data]);
    }
});
/*
 * Add New Item
 */
$route->post('/api/v1/todolist', function() {
    $input = app('request')->body;
    $items = new Items();
    if (empty($input['item'])) {
        echo json_encode(['status' => 'Error', 'message' => 'Item is required']);
    } else {
        $new_item_id = $items->insert(['item' => $input['item']]);
        if ($new_item_id) {
            echo json_encode(['status' => 'Success', 'data' => ['id' => $new_item_id]]);
        } else {
            echo json_encode(['status' => 'Error', 'message' => 'Something went wrong']);
        }
    }
});
/*
 * Update Item
 */
$route->patch('/api/v1/todolist/?', function($id) {
    $input = app('request')->query;
    $items = new Items();
    if (empty($input['item'])) {
        echo json_encode(['status' => 'Error', 'message' => 'Item is required']);
    } else {
        $result = $items->update($id, ['item' => $input['item']]);
        if ($result) {
            echo json_encode(['status' => 'Success']);
        } else {
            echo json_encode(['status' => 'Error', 'message' => 'Something went wrong']);
        }
    }
});
/*
 * Delete Item
 */
$route->delete('/api/v1/todolist/?', function($id) {
    $items = new Items();
    $result = $items->delete($id);
    if ($result) {
        echo json_encode(['status' => 'Success']);
    } else {
        echo json_encode(['status' => 'Error', 'message' => 'Something went wrong']);
    }
});
/*
 * Check/Uncheck Done Item
 */
$route->post('/api/v1/todolist/?/done', function($id) {
    $input = app('request')->body;
    $items = new Items();
    $done = !empty($input['done']) && $input['done'] == 'yes' ? true : false;
    $result = $items->update($id, ['done' => $done]);
    if ($result) {
        echo json_encode(['status' => 'Success']);
    } else {
        echo json_encode(['status' => 'Error', 'message' => 'Something went wrong']);
    }
});
$route->end();
