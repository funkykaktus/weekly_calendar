<?php
$valueName=$_POST['name'];
$valueDate=$_POST['date'];
$valueStartTime=$_POST['startTime'];
$valueEndTime=$_POST['endTime'];
echo $valueEndTime," ",$valueStartTime," ",$valueDate," ",$valueName;
        
        $dbservername='localhost';
		$dbUsername="root";
		$dbpassword="";
		$dbName="timetable_users";
		$charset="utf8mb4";


try{
    $db="mysql:host=".$dbservername.";dbname=".$dbName;
    $pdo=new PDO($db,$dbUsername,$dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $sql="INSERT INTO timetable (name, datetable, starttime, endtime)
     VALUES ('$valueName','$valueDate','$valueStartTime','$valueEndTime')";
    $pdo->exec($sql);


    

}catch(PDOException $e){
    echo $sql . "<br>" . $e->getMessage(),"connection failed";
}

$pdo=null;

?>