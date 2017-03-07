<?php
header('Content-Type: text/xml');
header("Cache-Control: no-cache, must-revalidate");
$dbhost = 'localhost';
$dbuser = 'jdm25';
$dbpass = 'j4m3rs';
$dbname = 'jdm25';
$dbtable = 'mail';


$q=$_GET["mailID"];


$con = mysql_connect($dbhost, $dbuser, $dbpass);
if (!$con)
 {
 	die('Could not connect: ' . mysql_error());
 }
$dbselect = mysql_select_db($dbname,$con);

$sql="UPDATE $dbtable SET status='read' WHERE mailID='$q'";

$result = mysql_query($sql);

$sql1="SELECT * FROM $dbtable WHERE mailID='$q'";

$result1 = mysql_query($sql1);

echo '<?xml version="1.0" encoding="ISO-8859-1"?> <mailbox>';

while($row = mysql_fetch_array($result1))
 {
 
	echo"<mail>";
 	echo "<userid>".$row['userID']."</userid>";
 	echo "<sender>".$row['Sender']."</sender>";
 	echo "<mailid>".$row['mailID']."</mailid>";
	echo "<subject>".$row['Subject']."</subject>";
     	echo "<message>".$row['Message']."</message>"; 
	echo "<date>".$row['Date']."</date>";
 	echo "<time>".$row['Time']."</time>";
 	echo "<status>".$row['status']."</status>";
	echo "</mail>";
	}
	echo "</mailbox>";

mysql_close($con);

?>
