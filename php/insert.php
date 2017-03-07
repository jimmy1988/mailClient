<?php

$dbhost = 'localhost';
$dbuser = 'jdm25';
$dbpass = 'j4m3rs';
$dbname = 'jdm25';
$dbtable = 'mail';

// connect to the database
$db = mysql_connect($dbhost, $dbuser, $dbpass) or die ('Error connecting to mysql database '. mysql_error());
 
 $id=$_GET["id"];
 $send=$_GET["sender"];
 $sub=$_GET["subject"];
 $msg=$_GET["message"];
 $dat=$_GET["date"];

$mailid= uniqid($id).date("ymd").time();
$d=date("D M j Y G:i:s ");                
$t=time();
$s="unread";


if (!$db) {
    die('Not connected : ' . mysql_error());
} else {
 
}
 
// select the table
$dbselect = mysql_select_db($dbname);
 

if (!$dbselect) {
    die ('Can\'t use $dbname : ' . mysql_error());
} else {
}
 
if ($id=='') {
 	$id="empty";
}
if ($sub=='') {
 	$sub="empty";
}
if ($msg=='') {
 	$msg="empty";
}

if ($send=='') {
 	$send="empty";
}

$result=mysql_query("INSERT INTO  $dbtable values ('$id','$mailid','$send','$sub','$msg','$d','$t','$s')",$db); 


if ($result) {
   	echo "inserted"; 
    $data = '';
 
    
} else {  
    echo 'Error: Could not get any data.\n';  
} 
 
echo $data; 
 

mysql_close($db);


?>