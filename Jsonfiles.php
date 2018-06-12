<?php
	$q = $_REQUEST["type"];
	$to_encode = array();

	if($q=="holidays"){
		$file1=file_get_contents("Helgdagar2016-2023.json");		
		echo $file1;

	}
	else if($q=="goodToKnow"){
		$file2=file_get_contents("Braattveta2016-2023.json");		
		echo $file2;

		
	}else if($q=="database"){


	
	$dbservername='localhost';
$dbUsername="root";
$dbpassword="";
$dbName="timetable_users";
$charset="utf8mb4";
$date1="2018-06-01";
$date2="2019-06-20";


try{
    $db="mysql:host=".$dbservername.";dbname=".$dbName.";charset=".$charset;
    $pdo=new PDO($db,$dbUsername,$dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    //return $pdo;
    $pdotest=$pdo->query("SELECT * FROM timetable where datetable BETWEEN  '$date1' AND '$date2';");

    while($row=$pdotest->fetch()){
       /* $uid=$row['name'];
        $uid1=$row['starttime'];
        $uid2=$row['endtime'];
		$uid3=$row['datetable'];
		$a=$uid.$uid1.$uid2.$uid3;
*/
		$to_encode[]=$row;
	}
	echo (json_encode($to_encode));
    

}catch(Exception $e){
    echo "connection failed";
}
	}
	
?>



    