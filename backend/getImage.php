<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once('./config/Config.php');

$db = new Connection();
$pdo = $db->connect();

$productId = $_GET['id'] ?? 0;

if ($productId) {
    $stmt = $pdo->prepare("SELECT photo FROM products WHERE productid = ?");
    $stmt->execute([$productId]);
    $photo = $stmt->fetchColumn();

    if ($photo) {
        $photo = base64_decode($photo);
        header("Content-Type: image/png"); // Set appropriate content type
        echo $photo;
    } else {
        http_response_code(404);
        echo "Image not found";
    }
} else {
    http_response_code(400);
    echo "Invalid product ID";
}
?>
