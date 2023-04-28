<?php
// Retrieve form data
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Validate form data
if (empty($name) || empty($email) || empty($message)) {
  // Redirect back to contact page with error message
  header("Location: contact.html?status=error");
  exit();
}

// Send email
$to = "info@hotdogshotdogsllc.com";
$subject = "New message from $name";
$body = "From: $name\nEmail: $email\n\nMessage:\n$message";
$headers = "From: $email";

if (mail($to, $subject, $body, $headers)) {
  // Redirect back to contact page with success message
  header("Location: contact.html?status=success");
  exit();
} else {
  // Redirect back to contact page with error message
  header("Location: contact.html?status=error");
  exit();
}
?>
