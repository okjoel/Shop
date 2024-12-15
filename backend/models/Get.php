<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Handle preflight requests
    exit;
}

class Get {
    protected $gm, $pdo;

    public function __construct(\PDO $pdo) {
        $this->pdo = $pdo;
        $this->gm = new GlobalMethods($pdo);
    }

        // Method to get all images
		public function getImages() {
			$sql = "SELECT * FROM images ORDER BY uploaded_at DESC"; // Adjust query as needed
	
			$res = $this->gm->generalQuery($sql, "No images found.");
			if ($res['code'] == 200) {
				return $res['data']; // Return the fetched images data
			} else {
				return []; // Return an empty array if no images found or error occurred
			}
		}

		// Method to get all images
		public function getComments() {
			$sql = "SELECT * FROM comments ORDER BY created_at DESC"; // Adjust query as needed
	
			$res = $this->gm->generalQuery($sql, "No comments found.");
			if ($res['code'] == 200) {
				return $res['data']; // Return the fetched images data
			} else {
				return []; // Return an empty array if no images found or error occurred
			}
		}

		public function pullProducts () {
			$sql = "SELECT * FROM products;"; // Adjust query as needed
	
			$res = $this->gm->generalQuery($sql, "No records found");	
			if ($res['code'] == 200) {
				$payload = $res['data'];
				$remarks = "success";
				$message = "Successfully retrieved requested data";
			} else {
				$payload = null;
				$remarks = "failed";
				$message = $res['errmsg'];
			}
			return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);
		}
		

  // Method to get a product by its ID
  public function getProductById($productId) {
	if ($productId) {
		$sql = "SELECT * FROM products WHERE productid = :id LIMIT 1";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindParam(':id', $productId, PDO::PARAM_INT);
		$stmt->execute();
		$result = $stmt->fetch(PDO::FETCH_ASSOC);

		if ($result) {
			return $this->gm->sendPayload($result, "success", "Product retrieved successfully", 200);
		} else {
			return $this->gm->sendPayload(null, "failed", "Product not found", 404);
		}
	} else {
		return $this->gm->sendPayload(null, "failed", "Product ID is required", 400);
	}
}





		  



}
		




?>