<?PHP
define('kOptional', true);
define('kMandatory', false);




error_reporting(E_ERROR | E_WARNING | E_PARSE);
ini_set('track_errors', true);

function DoStripSlashes($fieldValue)  {
// temporary fix for PHP6 compatibility - magic quotes deprecated in PHP6
 if ( function_exists( 'get_magic_quotes_gpc' ) && get_magic_quotes_gpc() ) {
  if (is_array($fieldValue) ) {
   return array_map('DoStripSlashes', $fieldValue);
  } else {
   return trim(stripslashes($fieldValue));
  }
 } else {
  return $fieldValue;
 }
}

function FilterCChars($theString) {
 return preg_replace('/[\x00-\x1F]/', '', $theString);
}

function CheckEmail($email2, $optional) {
 if ( (strlen($email2) == 0) && ($optional === kOptional) ) {
  return true;
 } elseif ( eregi("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$", $email2) ) {
  return true;
 } else {
  return false;
 }
}




if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
 $clientIP = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
 $clientIP = $_SERVER['REMOTE_ADDR'];
}

$FTGname = DoStripSlashes( $_POST['name'] );
$FTGemail = DoStripSlashes( $_POST['email2'] );
$FTGmessage = DoStripSlashes( $_POST['message'] );
$FTGkeyword = DoStripSlashes( $_POST['keyword'] );
$FTGsend = DoStripSlashes( $_POST['send'] );
$FTGclear = DoStripSlashes( $_POST['clear'] );

#
# moakley
# 2011/06/01
# Spammer hit the honeypot. Just send them on without emailing the webmaster.
#
if(!empty($_POST['email'])) {
    header("Location: contacts_submit.html");
}

$validationFailed = false;

# Fields Validations


if (!CheckEmail($FTGemail, kMandatory)) {
 $FTGErrorMessage['email2'] = 'Please type in a valid email';
 $validationFailed = true;
}



# Include message in error page and dump it to the browser

if ($validationFailed === true) {

 $errorPage = '<html><head><meta http-equiv="content-type" content="text/html; charset=utf-8" /><title>Error</title></head><body>Errors found: <!--VALIDATIONERROR--></body></html>';

 $errorPage = str_replace('<!--FIELDVALUE:name-->', $FTGname, $errorPage);
 $errorPage = str_replace('<!--FIELDVALUE:email-->', $FTGemail, $errorPage);
 $errorPage = str_replace('<!--FIELDVALUE:message-->', $FTGmessage, $errorPage);
 $errorPage = str_replace('<!--FIELDVALUE:keyword-->', $FTGkeyword, $errorPage);
 $errorPage = str_replace('<!--FIELDVALUE:send-->', $FTGsend, $errorPage);
 $errorPage = str_replace('<!--FIELDVALUE:clear-->', $FTGclear, $errorPage);
 $errorPage = str_replace('<!--ERRORMSG:email2-->', $FTGErrorMessage['email2'], $errorPage);


 $errorList = @implode("<br />\n", $FTGErrorMessage);
 $errorPage = str_replace('<!--VALIDATIONERROR-->', $errorList, $errorPage);


 if (count( array_filter( $FTGErrorMessage ) ) > 0 ) {

  $alertJSErrorMessage = "window.alert('" . @implode('\n', str_replace("'", "\'", array_filter( $FTGErrorMessage ) ) ) . "');";

  $onloadPattern = '/(<body[^>]+onload=[\"]*)"([^>]*)>/i';

  if ( preg_match( $onloadPattern, $errorPage ) ) {

   $replacementPattern = '\1"' . $alertJSErrorMessage . '\2>';

   $errorPage = preg_replace( $onloadPattern, $replacementPattern, $errorPage);

  } else {

   $onloadPattern = '/(<body[^>]*)>/i';
   $replacementPattern = '\1 onload="' . $alertJSErrorMessage . '">';

   $errorPage = preg_replace( $onloadPattern, $replacementPattern, $errorPage);

  }

 }
 echo $errorPage;

}

if ( $validationFailed === false ) {

 # Email to Form Owner

 $emailSubject = FilterCChars("Solar Decathlon Inquiry");

 $emailBody = "name : $FTGname\n"
  . "email : $FTGemail\n"
  . "message : $FTGmessage\n"
  . "";

  $emailTo = 'Webmaster <solardecathlon.webmaster@nrel.gov>';

  $emailReplyTo = FilterCChars("$FTGemail");
  $emailFrom = 'No Reply <no-reply@nrelcloud.org>';

  $emailHeader = "Reply-To: $emailReplyTo\n"
   . "From: $emailFrom\n"
   . "MIME-Version: 1.0\n"
   . "Content-type: text/plain; charset=\"UTF-8\"\n"
   . "Content-transfer-encoding: 8bit\n";

  mail($emailTo, $emailSubject, $emailBody, $emailHeader);


  # Redirect user to success page

header("Location: about-contacts.html?thanks");

}

?>
