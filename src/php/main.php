<?php
/* https://api.telegram.org/bot1843225912:AAHV3s08kFhNaEKfZ2BYK4ql1y2OWcgZWmY/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$textarea = trim($_POST["textarea"]);
$token = "1843225912:AAHV3s08kFhNaEKfZ2BYK4ql1y2OWcgZWmY";
$chat_id = "-346847234";
$arr = array(
  'Ім`я: ' => $name,
  'Email: ' => $email,
  'Повідомлення: ' => $textarea
);
foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

?>