<?php 


function listDirImages($dir) { //$dir is the name of the directory you want to list the images.
$files = scandir($dir); //scans the directory's files
$preg = "/.(jpg|gif|png|jpeg)/i"; //match the following files, can be changed to limit or extend range, ie: png,jpeg,etc.

$images = array();

		foreach($files as $img) { //loop through directory files
				if(substr($img, 0, 1) != '.') { //ignore anything starting with a period
				   $images[]= $img;
				}
		 }
		
		echo  json_encode($images);
}
listDirImages('gallery'); //call function

?>