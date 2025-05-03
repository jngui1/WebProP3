<?php
    // When adding to your CODD files, use youe GSU Username
    $db_username = "jngui1";
    
    $conn = new mysqli("localhost", $db_username, $db_username, $db_username);
    
    // Check connection
    if ($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $new_username = "[username]";
?>
<html lang="en">
    <head>
        <title>Conway's Game of Life - Create Account</title>

        <meta charset="UTF-8">

        <link rel="stylesheet" type="text/css" href="layout.css">
        
    </head>

    <body>
        <div><h2>
            Welcome, <?= $new_username ?>!<br>Your Account Has Been Created
        </h2></div>
        
        <div><button type="button" onclick="window.location.assign('index.php')">
            Return to Login
        </button></div>
        
    </body>

</html>