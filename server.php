<?php
// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Check if the image file is uploaded
    if (isset($_FILES['image'])) {
        $uploadedFile = $_FILES['image'];
        $uploadDir = 'uploads/'; // Directory where the image will be stored

        // Ensure the uploads directory exists
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true); // Create directory if it doesn't exist
        }

        // Generate the full path for the uploaded file
        $uploadFilePath = $uploadDir . basename($uploadedFile['name']);

        // Attempt to move the uploaded file to the target directory
        if (move_uploaded_file($uploadedFile['tmp_name'], $uploadFilePath)) {
            echo "Image uploaded successfully. <br>";
            echo "Uploaded Image Path: <a href='$uploadFilePath'>$uploadFilePath</a>";
        } else {
            echo "Error uploading image.";
        }
    } else {
        echo "No image file uploaded.";
    }
}
?>
