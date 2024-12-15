<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

require_once("./config/Config.php");



$db = new Connection();
$pdo = $db->connect();
$gm = new GlobalMethods($pdo);
$post = new Post($pdo);
$get = new Get($pdo);
$auth = new Auth($pdo);

if (isset($_REQUEST['request'])) {
    $req = explode('/', rtrim($_REQUEST['request'], '/'));
} else {
    $req = array("errorcatcher");
}

header("Content-Type: application/json; charset=utf-8");

switch($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        switch($req[0]) {
            case 'register':
                $d = json_decode(base64_decode(file_get_contents("php://input")));
                echo json_encode($auth->register($d), JSON_PRETTY_PRINT);
            break;
            case 'registeradmin':
                $d = json_decode(base64_decode(file_get_contents("php://input")));
                echo json_encode($auth->registeradmin($d), JSON_PRETTY_PRINT);
            break;
            case 'login':
                $d = json_decode(base64_decode(file_get_contents("php://input")));
                echo json_encode($auth->login($d), JSON_PRETTY_PRINT);
            break;
            case 'loginadmin':
                $d = json_decode(base64_decode(file_get_contents("php://input")));
                echo json_encode($auth->loginadmin($d), JSON_PRETTY_PRINT);
            break;
            case 'pullProducts':
                $f = json_decode(base64_decode(file_get_contents("php://input")));
                echo json_encode($get->pullProducts("product", $f), JSON_PRETTY_PRINT);
            break;
            case 'deleteProduct':
                $data = json_decode(file_get_contents("php://input"));
                if ($data) {
                    echo json_encode($post->deleteProduct($data), JSON_PRETTY_PRINT);
                } else {
                    echo json_encode(['status' => 'failure', 'message' => 'Invalid data format'], JSON_PRETTY_PRINT);
                }
            break;

            
			case 'addProduct':
				if (isset($_FILES['photo']) && isset($_POST['name']) && isset($_POST['price']) && isset($_POST['description'])) {
					$table = 'products';
					$data = array(
						"name" => $_POST['name'],
						"price" => $_POST['price'],
						"description" => $_POST['description']
					);
					$photo = $_FILES['photo'];
					$response = $gm->insertProduct($table, $data, $photo);
					echo json_encode($response, JSON_PRETTY_PRINT);
				} else {
					http_response_code(400);
					echo json_encode(array("code" => 400, "errmsg" => "Invalid request"), JSON_PRETTY_PRINT);
				}
				break;
                
                
                case 'getCartItems':
                    $data = json_decode(file_get_contents('php://input'));
                    $userId = $data->userId ?? null;
                    if ($userId) {
                        echo json_encode($gm->getCartItems($userId), JSON_PRETTY_PRINT);
                    } else {
                        echo json_encode(["status" => "error", "message" => "User ID is missing"]);
                    }
                    break;
                    case 'getCheckedOutItems':
                        $data = json_decode(file_get_contents('php://input'));
                        $userId = $data->userId ?? null;
                        if ($userId) {
                            echo json_encode($gm->getCheckedOutItems($userId), JSON_PRETTY_PRINT);
                        } else {
                            echo json_encode(["status" => "error", "message" => "User ID is missing"]);
                        }
                        break;
                
                case 'addToCart':
                    $d = json_decode(base64_decode(file_get_contents("php://input")));
                    echo json_encode($post->addToCart($d), JSON_PRETTY_PRINT);
                break;
                
                case 'deleteFromCart':
                    $data = json_decode(file_get_contents('php://input'));
                
                    // Check if $data->id is an array or a single value
                    if (is_array($data->id)) {
                        // Handle multiple IDs
                        $ids = $data->id;
                        echo json_encode($gm->deleteFromCart($ids), JSON_PRETTY_PRINT);
                    } else {
                        // Handle single ID
                        $id = $data->id;
                        echo json_encode($gm->deleteFromCart([$id]), JSON_PRETTY_PRINT);
                    }
                    break;

                    case 'checkoutCart':
                        $data = json_decode(file_get_contents('php://input'));
                        $userId = $data->userId ?? null;
                        $selectedItems = $data->items ?? null; // Add this line to get the selected items
                    
                        if ($userId && $selectedItems) {
                            echo json_encode($gm->checkoutCart($userId, $selectedItems), JSON_PRETTY_PRINT);
                        } else {
                            echo json_encode(["status" => "error", "message" => "User ID or items are missing"]);
                        }
                        break;
                    


                        case 'updateCartItem':
                            $data = json_decode(file_get_contents('php://input'));
                            if (isset($data->id) && isset($data->newQuantity)) {
                                $id = $data->id;
                                $newQuantity = $data->newQuantity;
                                
                                // Debugging output
                                error_log("Received id: $id, newQuantity: $newQuantity");
                                
                                // Perform the update
                                $result = $gm->updateCartItem($id, $newQuantity);
                                
                                // Debugging output
                                error_log("Update result: " . json_encode($result));
                                
                                echo json_encode($result);
                            } else {
                                echo json_encode(["status" => "error", "message" => "Missing parameters"]);
                            }
                            break;
                        




            break;
            case 'getImages':
                echo json_encode($gm->getImages(), JSON_PRETTY_PRINT);
            break;
        }
    break;

    case 'GET':
        switch ($req[0]) {
            case 'getImages':
                echo json_encode($get->getImages(), JSON_PRETTY_PRINT);
                break;
            case 'getComments':
                echo json_encode($get->getComments(), JSON_PRETTY_PRINT);
                break;
            case 'pullProducts':
                echo json_encode($get->pullProducts(), JSON_PRETTY_PRINT);
                break;

                case 'getProductById':
                    $productId = $_GET['id'] ?? null; // Get ID from query parameters
                    if ($productId) {
                        echo json_encode($get->getProductById((int)$productId), JSON_PRETTY_PRINT);
                    } else {
                        http_response_code(400);
                        echo json_encode(['code' => 400, 'message' => 'Product ID is required'], JSON_PRETTY_PRINT);
                    }
                    break;
        }
    break;

    default:
        http_response_code(403);
        echo json_encode(array("code" => 403, "message" => "Please contact the Systems Administrator"), JSON_PRETTY_PRINT);
    break;
}
?>
