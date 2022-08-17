<?php
// See all errors and warnings
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);

$mysqli = mysqli_connect("localhost", "root", "", "dbuser");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$email = isset($_POST["email"]) ? test_input($_POST["email"]) : null;
	$res = $mysqli->query("SELECT `user_id` FROM tbusers WHERE email = '$email'");
	if ($row = mysqli_fetch_array($res))
		$id = $row["user_id"];

	$pass = isset($_POST["pass"]) ? test_input($_POST["pass"]) : null;
	$eventName = isset($_POST["eventName"]) ?  test_input($_POST["eventName"]) : null;
	$eventDescription = isset($_POST["eventDescription"]) ? test_input($_POST["eventDescription"]) : null;
	$eventDate = isset($_POST["eventDate"]) ? $_POST["eventDate"] : null;
	$filename = isset($_FILES['picToUpload']['name'][0]) ? $_FILES['picToUpload']['name'][0] : null;

	if ($eventName != null && $eventDescription != null && $eventDate != null && $filename != null) {

		$target_dir = "gallery/";

		$allowedFiles =  array('jpg', 'jpeg');
		$ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

		if ($_FILES['picToUpload']['size'][0] < 1000000 && in_array($ext, $allowedFiles)) {
			$target_file = $target_dir . $filename;
			move_uploaded_file($_FILES['picToUpload']['tmp_name'][0], $target_file);
		} else {
			echo "File is too big or not an image";
			exit();
		}

		$mysqli->query("INSERT INTO tbevents (`user_id`, `name`, `description`, `date`) VALUES ($id, '$eventName', '$eventDescription', '$eventDate')");

		$res = $mysqli->query("SELECT event_id FROM tbevents WHERE `user_id` = $id AND `name` = '$eventName'");
		if ($res && $row = mysqli_fetch_array($res))
			$eventId = $row["event_id"];

		$mysqli->query("INSERT INTO tbgallery (event_id, image_name) VALUES ($eventId, '$filename')");
	}
}

function test_input($data)
{
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}
?>

<!DOCTYPE html>
<html>

<head>
	<title>IMY 220 - Assignment 2</title>
	<meta charset="utf-8" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="style.css" />
	<meta charset="utf-8" />
	<meta name="author" content="Keelan Matthews">
	<!-- Replace Name Surname with your name and surname -->
</head>

<body>
	<div class="container">
		<?php
		$query = "SELECT * FROM tbusers WHERE email = '$email' AND password = '$pass'";
		$res = $mysqli->query($query);
		if ($row = mysqli_fetch_array($res)) {
			echo 	"<table class='table table-bordered mt-3'>
							<tr>
								<td>Name</td>
								<td>" . $row['name'] . "</td>
							<tr>
							<tr>
								<td>Surname</td>
								<td>" . $row['surname'] . "</td>
							<tr>
							<tr>
								<td>Email Address</td>
								<td>" . $row['email'] . "</td>
							<tr>
							<tr>
								<td>Birthday</td>
								<td>" . $row['birthday'] . "</td>
							<tr>
						</table>";


			echo 	"<form action='' method='POST' enctype='multipart/form-data'>
							<div class='form-group'>
								
								<label for='eventName'>Event Name:</label><br>
								<input type='text' class='form-control' name='eventName' /><br>								
								<label for='eventDescription'>Event Description:</label><br>
								<input type='text' class='form-control' name='eventDescription' /><br>

								<label for 'eventDate'>Event date:</label><br>
								<input type='date' class='form-control' name='eventDate' /><br>	

								<input type='file' class='form-control' name='picToUpload[]' id='picToUpload' multiple='multiple' /><br/>	
								
								<input type='hidden' name='email' value='$email' />
								<input type='hidden' name='pass' value='$pass' />

								<input type='submit' class='btn-standard' value='Upload event' name='submit' />
							</div>
					  	</form>";

			echo "<div class='container'>
						<h2>UPCOMING EVENTS</h2>
						<div class='row eventsGallery'>";
			$res = $mysqli->query("SELECT * FROM tbevents e, tbgallery g WHERE e.user_id = $id AND e.event_id = g.event_id ORDER BY e.date DESC");
			while ($res && $row = mysqli_fetch_array($res)) {
				echo "<div class='card col-3 p-0'>
							<div class='card-header'>
								<p>" . $row['date'] . "</p>
							</div>
							<img src='gallery/" . $row['image_name'] . "' alt='thumbnail' />
							<div class='card-body'>
								
								<h5>" . $row['name'] . "</h5>
								<p class='card-text'>" . $row['description'] . "</p>
							</div>
						</div>";
			}
			echo "</div>
					</div>";
		} //end if

		else {
			echo 	'<div class="alert alert-danger mt-3" role="alert">
  							You are not registered on this site!
  						</div>';
		} //end else
		?>
	</div>
</body>

</html>