<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type");

error_reporting(0);

// Parse input
$json = file_get_contents("php://input");
$object = json_decode($json);

$method = $object->method; // "add" || "check" || "update || "get"

// add: 2 for username already found, 1 for fail, 0 for success. 
// check: 2 for username not found, 1 for fail, 0 for success. 
$db_username = "baladeselu1";
$returnStatement = ["code" => 1];



/*$drop_table_SQL = "DROP TABLE Users;";
    
    $conn->query($drop_table_SQL);*/

$conn = new mysqli("localhost", $db_username, $db_username, $db_username);

// Check connection
if ($conn->connect_error) {
    echo json_encode($returnStatement);
    // die("Connection failed: " . $conn->connect_error);
}

$username = $object->username;
$password = $object->password;

if ($method === "add") {

    $email = $object->email;
    $code = add_user($conn, $username, $password, $email);
    $returnStatement = ["code" => $code];
} else if ($method === "check") {
    if ($username === "" || $password === "") {
        $code = 2;
    } else {
        $code = check_user($conn, $username, $password);
    }
    $returnStatement = ["code" => $code, "username" => $username];
} else if ($method === "update") {

    $code = update_user($conn, $username, $password);
    $returnStatement = ["code" => $code];
} else if ($method === "get") {
    $returnStatement = get_user_stats($conn);
}
echo json_encode($returnStatement);

function check_user($conn, $username, $password): int
{

    create_table($conn);

    $check_statement = "SELECT userID, passwordHash FROM Users WHERE username ='$username'";
    $result = $conn->query($check_statement);
    if ($result->num_rows <= 0) {
        return 0;
    }
    $row = $result->fetch_array();
    if ($row && password_verify($password, $row["passwordHash"])) {
        $success = 2;
    } else {
        $success = 0;
    }

    $conn->close();
    return $success;
}

function add_user($conn, $username, $password, $email): int
{
    create_table($conn);

    $add_statement = "SELECT * FROM Users WHERE username = '$username'";

    $result = $conn->query($add_statement);

    if ($result->num_rows <= 0) {
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);
        $add_user_SQL = "INSERT INTO Users (username, email, passwordHash) VALUES ('$username', '$email', '$hashed_password')";
        $conn->query($add_user_SQL);
        $success = 0;
    } else {
        $success = 2;
    }

    $conn->close();
    return $success;
}
function update_user($conn, $username, $password): int
{
    // Unimplemented
    $check_statement = "SELECT userID, passwordHash FROM Users WHERE username ='$username'";
    $result = $conn->query($check_statement);
    $row = $result->fetch_array();
    if ($row && password_verify($password, $row["passwordHash"])) {
        $success = 2;
    } else {
        $success = 0;
    }
    return $success;
}
function get_user_stats($conn): array
{
    $get_statement = "SELECT userID, username FROM Users ORDER BY userID";
    $result = $conn->query($get_statement);
    $userArray = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            array_push($userArray, [$row["userID"], $row["username"]]);
        }
    }
    return $userArray;
}
function create_table($conn): void
{
    $create_table_SQL = "CREATE TABLE Users(
        userID INT UNSIGNED NOT NULL AUTO_INCREMENT,
        username VARCHAR(1000) NOT NULL,
        email VARCHAR(1000) NOT NULL,
        passwordHash VARCHAR(1000) NOT NULL,
        PRIMARY KEY (userID)
    );";

    try {
        $conn->query($create_table_SQL);
    } catch (mysqli_sql_exception $error) {
        /*echo $conn->error;*/
    }
}
