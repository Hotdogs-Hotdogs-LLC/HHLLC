<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];
  $message = $_POST['message'];

  $to = 'info@hotdogshotdogsllc.com';
  $subject = 'New advertising inquiry';
  $headers = "From: $email\r\n";
  $headers .= "Reply-To: $email\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

  $body = "Name: $name\nEmail: $email\nPhone: $phone\nMessage: $message";

  if (mail($to, $subject, $body, $headers)) {
    echo 'Thank you for your inquiry. We will contact you shortly.';
  } else {
    echo 'There was a problem sending the email. Please try again later.';
  }
}
?>
