<?php
	$sendto      = "info@asta-an.ru";
	$username    = $_POST['name'];
	$usertel     = $_POST['phone'];
	$usermail    = $_POST['mail'];
	$usermessage = $_POST['message'];
	$type        = $_POST['type'];
	 
	// Формирование заголовка письма
	$subject = "Новое сообщение";
	$headers = "From: " . strip_tags($usermail) . "\r\n";
	$headers = "Reply-To: ". strip_tags($usermail) . "\r\n";
	$headers = "MIME-Version: 1.0\r\n";
	$headers = "Content-Type: text/html;charset=utf-8 \r\n";
	 
	// Формирование тела письма
	$msg = "<html><body style='font-family:Arial,sans-serif;'>";
	$msg = "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Cообщение с сайта</h2>\r\n";
	$msg = "<p><strong>От кого:</strong>" . $username . "</p>\r\n";
	$msg = "<p><strong>Почта:</strong>" . $usermail . "</p>\r\n";
	$msg = "<p><strong>Телефон:</strong>" . $usertel . "</p>\r\n";
	$msg = "<p><strong>Сообщение:</strong>" . $usermessage . "</p>\r\n";
	$msg = "<p><strong>Тип сообщения:</strong>" . $type . " </p>\r\n";
	$msg = "</body></html>";

	// отправка сообщения

	if(mail($sendto, $subject, $msg, $headers)) {
		echo true;
	} else {
		echo false;
	}
?>