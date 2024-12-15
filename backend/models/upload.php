<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once("./config/Config.php");
$db = new Connection();
$pdo = $db->connect();
$gm = new GlobalMethods($pdo);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['photo']) && isset($_POST['name']) && isset($_POST['price']) && isset($_POST['description'])) {
        $table = 'products';
        $data = array(
            "name" => $_POST['name'],
            "price" => $_POST['price'],
            "description" => $_POST['description']
        );

        $photo = $_FILES['photo'];
        
        // Handle file upload
        $uploadDirectory = 'upload/';
        $uploadFile = $uploadDirectory . basename($photo['name']);
        
        if (move_uploaded_file($photo['tmp_name'], $uploadFile)) {
            // Insert product data into database with photo path
            $photoPath = $uploadFile; // Store the path of the uploaded photo
            $data['photo'] = $photoPath;
            
            // Correct function call with three arguments
            $result = $gm->insertProduct($table, $data, $photoPath);

            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            echo json_encode(array("code" => 403, "errmsg" => "File upload failed"), JSON_PRETTY_PRINT);
        }
    } else {
        http_response_code(400);
        echo json_encode(array("code" => 400, "errmsg" => "Invalid request"), JSON_PRETTY_PRINT);
    }
}
?>
