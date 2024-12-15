

<?php  

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Handle preflight requests
    exit;
}
	class GlobalMethods {
		protected $pdo;

		public function __construct(\PDO $pdo) {
			$this->pdo = $pdo;
		}

		
		// READ
		public function generalQuery($sql, $err) {
			$data = array();
			$errmsg = "";
			$code = 0;
			try {
				if($result = $this->pdo->query($sql)->fetchAll()){
					foreach ($result as $record)
						array_push($data, $record);
					$result = null;
					$code = 200;
					return array("code"=>$code, "data"=>$data);
				} else {
					$errmsg = $err;
					$code = 404;
				}
			} catch (\PDOException $e) {
				$errmsg = $e->getMessage();
				$code = 403;
			}
			return array("code"=>$code, "errmsg"=>$errmsg);
		}
		


		// INSERT 

		public function insert($table, $data){
			$i = 0; $fields=[]; $values=[];
			foreach ($data as $key => $value){
				array_push($fields, $key);
				array_push($values, $value);
			}

			try{
				$ctr = 0;
				$sqlstr = "INSERT INTO $table (";
				foreach ($fields as $value)	{
					$sqlstr.=$value; $ctr++;
					if($ctr<count($fields))	{
						$sqlstr.=", ";
					}
				}

				$sqlstr.=") VALUES (".str_repeat("?, ", count($values)-1)."?)";

				$sql = $this->pdo->prepare($sqlstr);
				$sql->execute($values);
				return array("code"=>200, "remarks"=>"success");

			} catch (\PDOException $e){
				$errmsg = $e->getMessage();
				$code = 403;
			}

			return array("code"=>$code, "errmsg"=>$errmsg);
		}

		// UPDATE 

		public function edit($table, $data, $conditionStringPassed){
			$fields=[]; $values=[];
			$setStr = "";

			foreach ($data as $key => $value) {
				array_push($fields, $key);
				array_push($values, $value);
			}
			
			try{
				$ctr = 0;
				$sqlstr = "UPDATE $table SET ";
				foreach ($data as $key => $value){
					$sqlstr.="$key=?"; $ctr++;
					if($ctr<count($fields)){
						$sqlstr.=", ";
					}
				}

				$sqlstr .= " WHERE ".$conditionStringPassed;
				$sql = $this->pdo->prepare($sqlstr);
				$sql->execute($values);

				return array("code"=>200, "remarks"=>"success");
				
			}
			
			catch(\PDOException $e){
				$errmsg = $e->getMessage();
				$code = 403;
			}
			
			return array("code"=>$code, "errmsg"=>$errmsg);
		}

		public function updateCartItem($itemId, $newQuantity) {
			$table = 'cart';
			$data = [
				'quantity' => $newQuantity
			];
			$conditionString = "id = $itemId";
			
			return $this->edit($table, $data, $conditionString);
		}
		
		

		public function delete($table, $data, $condition) {
			$sql = "DELETE FROM $table WHERE $condition";
			$code = 0;
			$errmsg = "";
			$remarks = "";
		
			try {
				$stmt = $this->pdo->prepare($sql);
				$stmt->execute();
				$rowCount = $stmt->rowCount();
		
				if ($rowCount > 0) {
					$code = 200;
					$remarks = "success";
				} else {
					$code = 404; // Not Found
					$errmsg = "No records found for deletion.";
				}
			} catch (\PDOException $e) {
				$errmsg = $e->getMessage();
				$code = 403; // Forbidden
			}
		
			return array("code" => $code, "errmsg" => $errmsg, "remarks" => $remarks);
		}

		public function insertProduct($table, $data, $photo) {
			$fields = ['name', 'price', 'description', 'photo'];
			$values = [
				$data['name'],
				$data['price'],
				$data['description'],
				$this->uploadPhoto($photo) // This method handles photo upload and returns the file path
			];
			
			$placeholders = implode(", ", array_fill(0, count($fields), "?"));
			
			$sqlstr = "INSERT INTO $table (" . implode(", ", $fields) . ") VALUES (" . $placeholders . ")";
			
			try {
				$sql = $this->pdo->prepare($sqlstr);
				$sql->execute($values);
				return array("code" => 200, "remarks" => "success");
			} catch (PDOException $e) {
				return array("code" => 403, "errmsg" => $e->getMessage());
			}
		}
		
		private function uploadPhoto($photo) {
			$targetDir = "uploads/";
			$targetFile = $targetDir . basename($photo["name"]);
			
			if (move_uploaded_file($photo["tmp_name"], $targetFile)) {
				return $targetFile; // Return the file path to be stored in the database
			} else {
				throw new Exception("File upload failed"); // Handle the error
			}
		}
			
		
		
		
		
		
		

		
		

		public function getImages() {
			$sql = "SELECT productid, photo FROM products ORDER BY productid DESC"; // Adjust query if needed
		
			try {
				$stmt = $this->pdo->query($sql);
				$images = $stmt->fetchAll(PDO::FETCH_ASSOC);
		
				// Prepare response
				if ($images) {
					foreach ($images as &$image) {
						$image['photo'] = base64_decode($image['photo']);
					}
					return array("code" => 200, "data" => $images);
				} else {
					return array("code" => 404, "errmsg" => "No images found.");
				}
			} catch (\PDOException $e) {
				return array("code" => 403, "errmsg" => $e->getMessage());
			}
		}
		
		public function addToCart($d) {
			$sql = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
			try {
				$stmt = $this->pdo->prepare($sql);
				$stmt->execute([$d->user_id, $d->product_id, $d->quantity]);
				return array("code" => 200, "message" => "Product added to cart successfully");
			} catch (Exception $e) {
				return array("code" => 500, "message" => $e->getMessage());
			}
		}
		
		

		function getCartItems($userId) {
			global $pdo; // Use your PDO instance
		
			$sql = "SELECT c.id, c.productid, c.quantity, p.name, p.price, p.photo
					FROM cart c
					JOIN products p ON c.productid = p.productid
					WHERE c.user_id = :user_id";
			$stmt = $pdo->prepare($sql);
			$stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
			$stmt->execute();
		
			$items = $stmt->fetchAll(PDO::FETCH_ASSOC);
			return ["status" => "success", "items" => $items];
		}
		function getCheckedOutItems($userId) {
			global $pdo; // Use your PDO instance
		
			$sql = "SELECT c.id, c.productid, c.quantity, p.name, p.price, p.photo
					FROM checkedout c
					JOIN products p ON c.productid = p.productid
					WHERE c.user_id = :user_id";
			$stmt = $pdo->prepare($sql);
			$stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
			$stmt->execute();
		
			$items = $stmt->fetchAll(PDO::FETCH_ASSOC);
			return ["status" => "success", "items" => $items];
		}
		
		
		function deleteFromCart($ids) {
			global $pdo; // Use your PDO instance
		
			try {
				if (is_array($ids)) {
					// Handle multiple IDs
					$placeholders = implode(',', array_fill(0, count($ids), '?'));
					$sql = "DELETE FROM cart WHERE id IN ($placeholders)";
					$stmt = $pdo->prepare($sql);
					$stmt->execute($ids);
				} else {
					// Handle single ID
					$sql = "DELETE FROM cart WHERE id = :id";
					$stmt = $pdo->prepare($sql);
					$stmt->bindParam(':id', $ids, PDO::PARAM_INT);
					$stmt->execute();
				}
		
				return ["status" => "success", "message" => "Item(s) removed from cart"];
			} catch (PDOException $e) {
				error_log("Error: " . $e->getMessage());
				return ["status" => "error", "message" => $e->getMessage()];
			}
		}
		
		
		
		function checkoutCart($userId, $selectedItems) {
			global $pdo;
		
			try {
				// Begin transaction
				$pdo->beginTransaction();
		
				// Prepare to move selected cart items to checkedout table
				$sql = "INSERT INTO checkedout (user_id, productid, quantity, date)
						VALUES (?, ?, ?, NOW())";
				$stmt = $pdo->prepare($sql);
		
				foreach ($selectedItems as $item) {
					$stmt->execute([$userId, $item->productid, $item->quantity]);
				}
		
				// Prepare to delete selected items from cart table
				$placeholders = implode(',', array_fill(0, count($selectedItems), '?'));
				$sql = "DELETE FROM cart WHERE user_id = ? AND productid IN ($placeholders)";
				$stmt = $pdo->prepare($sql);
		
				// Bind parameters
				$params = [$userId];
				foreach ($selectedItems as $item) {
					$params[] = $item->productid;
				}
				$stmt->execute($params);
		
				// Commit transaction
				$pdo->commit();
		
				// Return a success response
				return ["status" => "success", "message" => "Checkout successful"];
			} catch (PDOException $e) {
				// Rollback transaction on error
				$pdo->rollBack();
				// Return an error response
				return ["status" => "error", "message" => $e->getMessage()];
			}
		}
		
		
		
		
		

		
		//PAYLOAD

		public function sendPayload($payload, $remarks, $message, $code) {

			$status = array("remarks"=>$remarks, "message"=>$message);			
			http_response_code($code);
			return array(
				"status"=>$status,
				"payload"=>$payload,
				'prepared_by'=>'King Agnas',
				"timestamp"=>date_create());
		} 


///////////////////////////////////////////

	}

	

?>