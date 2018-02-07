<?php

if(isset($_POST['email']) && isset($_POST['imie']) && isset($_POST['nazwisko']) && isset($_POST['tresc'])){
   
   $mail = $_POST['email'];
   $im = $_POST['imie'];
   $mess = nl2br($_POST['tresc']);
   $naz = $_POST['nazwisko'];
   
   $to = 'arekpawlak14@wp.pl';
   $from = $mail;
   $subject = "Wiadomość ze strony";
   $message = '<b>Imie:</b> '.$im.'<b>Nazwisko:</b> '.$naz.' <br><b>Email:</b> '.$mail.' <p>'.$mess.'</p>';
   
   $headers = "From: $mail\n";
   $headers .= "MIME-Version: 1.0\n";
   $headers .= "Content-type: text/html; charset=utf-8\n";
   
   if(mail($to, $subject, $message, $headers)){
      echo 'success';
   }
   else
      echo 'fail';

   
}

?>