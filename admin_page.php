<?php
    session_start();
    
    if ($_SESSION["username"] !== "root")
    {
        header("Location: index.php?error=true");
            
        exit();
    }
    
    // When adding to your CODD files, use your GSU Username
    $db_username = "username";
    
    $conn = new mysqli("localhost", $db_username, $db_username, $db_username);
    
    $check_for_users_SQL = "SELECT * FROM Users;";
    
    $result = $conn->query($check_for_users_SQL);
    
    $table_data = "";
    
    while($row = $result->fetch_assoc())
    {
        $table_data .= "<tr><td>" . $row["userID"] . "</td><td>" . $row["username"] . "</td><td>" . $row["email"] . "</td><td>#</td><td>#</td></tr>";
    }
?>
<!DOCTYPE html>

<html lang="en">
    <head>
        <title>Conway's Game of Life - Admin Dashboard</title>

        <meta charset="UTF-8">

        <link rel="stylesheet" type="text/css" href="layout.css">
        
        <?= $wish_added_alert ?>

    </head>

    <body>
        <div><h1>Admin Dashboard</h1></div>
        
        <div id="hours_graph"></div>
        
        <div>
            <table>
                <tr>
                    <th>UserID</th>
                    
                    <th>Username</th>
                    
                    <th>Email</th>
                    
                    <th>Play Time (hours)</th>
                    
                    <th>Simulations Ran</th>
                    
                </tr>
                
                <?= $table_data ?>
            
            </table>
            
        </div>
        
        <form>
            <label for="username">Username</label>
            
            <input type="text" id="username" name="username">
            
            <input type="submit" value="Suspend User">
            
            <input type="submit" value="Ban User">
            
        </form>
        
    </body>
    
</html>