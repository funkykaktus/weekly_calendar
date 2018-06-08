<?php
	$q = $_REQUEST["type"];

	if($q=="holidays"){
		$file=file_get_contents("Helgdagar2016-2023.json");		
		echo $file;}
	else{
		$file=file_get_contents("Braattveta2016-2023.json");		
		echo $file;
	}
	
?>