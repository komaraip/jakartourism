<?php
// filepath: c:\xampp\htdocs\Dashboard\Project\jakartourism-new\static\img\check_access.php

header('Content-Type: text/plain');

// Check directory permissions
echo "Directory Access Check\n";
echo "=====================\n\n";

$img_dir = __DIR__;
$parent_dir = dirname($img_dir);
$static_dir = dirname($img_dir);
$root_dir = dirname($static_dir);

echo "Image directory: $img_dir\n";
echo "Static directory: $static_dir\n";
echo "Root directory: $root_dir\n\n";

echo "Directory Permissions:\n";
echo "---------------------\n";
echo "Image directory: " . substr(sprintf('%o', fileperms($img_dir)), -4) . "\n";
echo "Static directory: " . substr(sprintf('%o', fileperms($static_dir)), -4) . "\n";
echo "Root directory: " . substr(sprintf('%o', fileperms($root_dir)), -4) . "\n\n";

// Check for example_img.jpg
echo "File Access Check\n";
echo "================\n\n";

$example_img = $img_dir . '/example_img.jpg';
if (file_exists($example_img)) {
    echo "example_img.jpg exists\n";
    echo "File size: " . filesize($example_img) . " bytes\n";
    echo "File permissions: " . substr(sprintf('%o', fileperms($example_img)), -4) . "\n";
} else {
    echo "ERROR: example_img.jpg does not exist!\n";
}

echo "\n";
echo "Environment Information\n";
echo "======================\n\n";

echo "PHP version: " . phpversion() . "\n";
echo "Server software: " . $_SERVER['SERVER_SOFTWARE'] . "\n";
echo "Document root: " . $_SERVER['DOCUMENT_ROOT'] . "\n";
echo "Request URI: " . $_SERVER['REQUEST_URI'] . "\n";
echo "Request method: " . $_SERVER['REQUEST_METHOD'] . "\n";

echo "\n";
echo "Path Information\n";
echo "===============\n\n";

echo "Current script: " . $_SERVER['SCRIPT_NAME'] . "\n";
echo "Requested path: " . $_SERVER['REQUEST_URI'] . "\n";
echo "Script filename: " . $_SERVER['SCRIPT_FILENAME'] . "\n";

echo "\nEnd of test.";
