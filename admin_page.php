<?php
    session_start();
    
    if ($_SESSION["isAdmin"] !== "1")
    {
        header("Location: index.php?error=true");
            
        exit();
    }
    
    $user_banned_alert = "";
    
    if ($_GET["username"] && $_GET["action"])
    {
        $user_banned_alert = "<script>alert('User \"" . $_GET["username"] . "\" has been " . $_GET["action"] . ".');</script>";
    }
    
    $hide_error = "class='hidden'";
    
    $error_message = "";
    
    if ($_GET["error"] === "true")
    {
        $hide_error = "";
        
        $error_message = "Invalid username - Please try again";
    }
    
    else if ($_GET["self_mod"] === "true")
    {
        $hide_error = "";
        
        $error_message = "Root accounts cannot be moderated";
    }
    
    require_once("db_username.php");
    
    $conn = new mysqli("localhost", $db_username, $db_username, $db_username);
    
    $check_for_users_SQL = "SELECT * FROM Users;";
    
    $result = $conn->query($check_for_users_SQL);
    
    $table_data = "";
    
    while($row = $result->fetch_assoc())
    {
        if ($row["isSuspended"] === "0")
        {
            $suspended = "No";
        }
        
        else
        {
            $suspended = "Yes";
        }
        
        if ($row["isBanned"] === "0")
        {
            $banned = "No";
        }
        
        else
        {
            $banned = "Yes";
        }
        
        $table_data .= "<tr><td>" . $row["userID"] . "</td><td>" . $row["username"] . "</td><td>" . $row["email"] . "</td><td>$suspended</td><td>$banned</td><td>#</td><td>#</td></tr>";
    }
?>
<!DOCTYPE html>

<html lang="en">
    <head>
        <title>Conway's Game of Life - Admin Dashboard</title>

        <meta charset="UTF-8">

        <link rel="stylesheet" type="text/css" href="layout.css">
        
        <?= $user_banned_alert ?>

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
                    
                    <th>Suspended?</th>
                    
                    <th>Banned?</th>
                    
                    <th>Play Time (hours)</th>
                    
                    <th>Simulations Ran</th>
                    
                </tr>
                
                <?= $table_data ?>
            
            </table>
            
        </div>
        
        <div <?= $hide_error ?>><p><?= $error_message ?></p></div>
        
        <div><form action="moderate_user.php" method="POST">
            <label for="username">Username</label>
            
            <input type="text" id="username" name="username" required>
            
            <input type="hidden" id="action" name="action">
            
            <input type="submit" id="suspend" value="Suspend User">
            
            <input type="submit" id="ban" value="Ban User">
            
        </form></div>
        
        <div><button type="button" onclick="window.location.assign('index.php')">
            Sign Out
        </button></div>
        
        <script type="text/javascript" src="admin_actions.js"></script>
        
    </body>
    
</html>