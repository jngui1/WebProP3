<?php
    // When adding to your CODD files, use your GSU Username
    $db_username = "username";
    
    $conn = new mysqli("localhost", $db_username, $db_username, $db_username);
    
    // Check connection
    if ($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);
    }
    
    /*
    $drop_table_SQL = "DROP TABLE Users;";
    
    $conn->query($drop_table_SQL);
    */
    
    $create_table_SQL = "CREATE TABLE Users(
        userID INT UNSIGNED NOT NULL AUTO_INCREMENT,
        username VARCHAR(1000) NOT NULL,
        email VARCHAR(1000) NOT NULL,
        passwordHash VARCHAR(1000) NOT NULL,
        isAdmin BOOL NOT NULL,
        PRIMARY KEY (userID)
    );";
    
    try
    {
        $conn->query($create_table_SQL);
        
        $hashed_admin_password = password_hash("root", PASSWORD_BCRYPT);
    
        $add_admin_SQL = "INSERT INTO Users (username, email, passwordHash, isAdmin)
            VALUES ('root', 'none', '$hashed_admin_password', 1);";
            
        $conn->query($add_admin_SQL);
    }
    
    catch (mysqli_sql_exception $error){/*echo $conn->error;*/}
    
    $check_for_user_SQL = "SELECT * FROM Users WHERE username = '" . $_POST["username"] . "';";
    
    $result = $conn->query($check_for_user_SQL);
    
    if ($result->num_rows <= 0)
    {
        $hashed_password = password_hash($_POST["password"], PASSWORD_BCRYPT);
        
        $message = "Welcome, " . $_POST["username"] . "!<br>Your Account Has Been Created!";
        
        $add_user_SQL = "INSERT INTO Users (username, email, passwordHash, isAdmin)
            VALUES ('" . $_POST["username"] . "', '" . $_POST["email"] . "', '$hashed_password', 0);";
            
        $conn->query($add_user_SQL);
        
        $hidden = "class='hidden'";
    }
    
    else
    {
        $message = "The username " . $_POST["username"] . " is already taken";
        
        $hidden = "";
    }
    
    $conn->close();
?>
<html lang="en">
    <head>
        <title>Conway's Game of Life - Create Account</title>

        <meta charset="UTF-8">

        <link rel="stylesheet" type="text/css" href="layout.css">
        
    </head>

    <body>
        <div><h2>
            <?= $message ?><br>
        </h2></div>
        
        <div><button type="button" <?= $hidden ?> onclick="window.location.assign('create_account.php')">
            Retry Account Creation
        </button></div>
        
        <div><button type="button" onclick="window.location.assign('index.php')">
            Return to Login
        </button></div>
        
    </body>

</html>