<?php
$directory = 'uploads';
$files = scandir($directory);

foreach ($files as $file) {
    if ($file !== '.' && $file !== '..') {
        echo $file . ' - ' . substr(sprintf('%o', fileperms($directory . '/' . $file)), -4) . '<br>';
    }
}
?>
