<?php

$dbservername='localhost';
$dbUsername="root";
$dbpassword="";
$dbName="timetable_users";
$charset="utf8mb4";
$date1="2016-01-01";
$date2="2020-01-01";
$t;
//$array=[];

try{
    $db="mysql:host=".$dbservername.";dbname=".$dbName.";charset=".$charset;
    $pdo=new PDO($db,$dbUsername,$dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    //return $pdo;
    $pdotest=$pdo->query("SELECT * FROM timetable where datetable BETWEEN  '$date1' AND '$date2';");

    while($row=$pdotest->fetch()){
        $uid=$row['name'];
        $uid1=$row['starttime'];
        $uid2=$row['endtime'];
        $uid3=$row['datetable'];
        $t=$uid;

    }
    echo $t;
    

}catch(Exception $e){
    echo "connection failed";
}

?>