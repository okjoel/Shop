<?php
$filename = $_GET['filename'];
$filePath = 'uploads/' . $filename;

if (file_exists($filePath)) {
    header('Content-Type: ' . mime_content_type($filePath));
    header('Content-Length: ' . filesize($filePath));
    readfile($filePath);
} else {
    http_response_code(404);
    echo 'File not found';
}
?>
