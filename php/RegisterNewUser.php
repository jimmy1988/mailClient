<?php

$dbhost = 'localhost';
$dbuser = 'jdm25';
$dbpass = 'j4m3rs';
$dbname = 'jdm25';
$dbtable = 'users';

// connect to the database
$db = mysql_connect($dbhost, $dbuser, $dbpass) or die ('Error connecting to mysql database '. mysql_error());
 
 $id=$_GET["userID"];
 $paswd=$_GET["passWD"];
 $name=$_GET["Name"];
 $surname=$_GET["Surname"];


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
if ($paswd=='') {
 $paswd="empty";
}
if ($name=='') {
 $name="empty";
}
if ($surname=='') {
 $surname="empty";
}


$sql1="SELECT * FROM $dbtable WHERE userID='$id'";

$result1 = mysql_query($sql1,$db);




if (mysql_num_rows($result1)==0) { 


$result=mysql_query("INSERT INTO  $dbtable values ('$name','$surname','$id','$paswd')",$db); 

if ($result) {
     	echo "registered"; 
    $data = '';
 
 
    
} else {  
    echo 'Error: Could not get any data.\n';  
} 
 
echo $data; 

} else {
echo "user id exists"; 
} 

mysql_close($db);


?>