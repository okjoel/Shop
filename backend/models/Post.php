<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Handle preflight requests
    exit;
}
class Post{
    protected $gm, $pdo, $get;

    public function __construct(\PDO $pdo) {
        $this->pdo = $pdo;
        $this->gm = new GlobalMethods($pdo);
        $this->get = new Get($pdo);
    }



    public function deleteProduct($data) {
        // Log the raw input for debugging
        error_log("Raw input: " . file_get_contents('php://input')); 
    
        // Decode the input
        $data = json_decode(file_get_contents('php://input'));
    
        // Log the decoded data
        error_log("Decoded data: " . print_r($data, true));
    
        // Ensure $data is not null and contains productid
        if (!$data || !isset($data->productid)) {
            return ['status' => 'failure', 'message' => 'Invalid data format'];
        }
    
        $productId = $data->productid;
    
        $sql = "DELETE FROM products WHERE productid = :productId";
    
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([':productId' => $productId]);
    
            if ($stmt->rowCount() > 0) {
                return ['status' => 'success', 'message' => 'Product deleted successfully'];
            } else {
                return ['status' => 'failure', 'message' => 'Product not found'];
            }
        } catch (PDOException $e) {
            return ['status' => 'failure', 'message' => $e->getMessage()];
        }
    }
    
    
    


    function addToCart($data) {
        try {
            $data = json_decode(file_get_contents('php://input'));
    
            // Validate input
            if (!isset($data->userId) || !isset($data->productId) || !isset($data->quantity)) {
                throw new Exception("Missing required parameters.");
            }
    
            $userId = $data->userId;
            $productId = $data->productId;
            $quantity = $data->quantity;
    
            // Check if product exists
            $sql = "SELECT COUNT(*) FROM products WHERE productid = :productid";
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':productid', $productId, PDO::PARAM_INT);
            $stmt->execute();
            $productExists = $stmt->fetchColumn();
    
            if (!$productExists) {
                throw new Exception("Product ID $productId does not exist.");
            }
    
            // Check if the product is already in the cart
            $sql = "SELECT quantity FROM cart WHERE user_id = :user_id AND productid = :productid";
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
            $stmt->bindParam(':productid', $productId, PDO::PARAM_INT);
            $stmt->execute();
            $existingQuantity = $stmt->fetchColumn();
    
            if ($existingQuantity !== false) {
                // Update the quantity if the item already exists
                $sql = "UPDATE cart SET quantity = quantity + :quantity WHERE user_id = :user_id AND productid = :productid";
                $stmt = $this->pdo->prepare($sql);
                $stmt->bindParam(':quantity', $quantity, PDO::PARAM_INT);
                $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
                $stmt->bindParam(':productid', $productId, PDO::PARAM_INT);
                $stmt->execute();
                return ["status" => "success", "message" => "Quantity updated in cart"];
            } else {
                // Insert into cart if the item is not in the cart
                $sql = "INSERT INTO cart (user_id, productid, quantity) VALUES (:user_id, :productid, :quantity)";
                $stmt = $this->pdo->prepare($sql);
                $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
                $stmt->bindParam(':productid', $productId, PDO::PARAM_INT);
                $stmt->bindParam(':quantity', $quantity, PDO::PARAM_INT);
                $stmt->execute();
                return ["status" => "success", "message" => "Item added to cart"];
            }
        } catch (Exception $e) {
            return ["status" => "error", "message" => $e->getMessage()];
        }
    }
    
    

    

    
    
    
    
    
    


    
    






}
?>