<?php
    session_start();
    
    if ($_SESSION["isAdmin"] !== "1")
    {
        header("Location: index.php?error=true");
            
        exit();
    }
    
    // When adding to your CODD files, use your GSU Username
    $db_username = "username";
    
    $conn = new mysqli("localhost", $db_username, $db_username, $db_username);
    
    $check_for_user_SQL = "SELECT * FROM Users WHERE username = '" . $_POST["username"] . "';";
    
    $result = $conn->query($check_for_user_SQL);
    
    if ($result->num_rows <= 0)
    {
        header("Location: admin_page.php?error=true");
        
        exit();
    }
    
    $update_user_SQL = "";
    
    $row = $result->fetch_assoc();
    
    if ($row["isAdmin"] === "1")
    {
        header("Location: admin_page.php?self_mod=true");
        
        exit();
    }
    
    else if ($_POST["action"] === "suspend")
    {
        $update_user_SQL = "UPDATE Users SET isSuspended = 1 WHERE username = '" . $_POST["username"] . "';";
    }
    
    else if ($_POST["action"] === "ban")
    {
        $update_user_SQL = "UPDATE Users SET isBanned = 1 WHERE username = '" . $_POST["username"] . "';";
    }
    
    else
    {
        header("Location: admin_page.php?error=true");
            
        exit();
    }
    
    $conn->query($update_user_SQL);
    
    if ($_POST["action"] === "suspend")
    {
        header("Location: admin_page.php?username=" . $_POST["username"] . "&action=suspended");
        
        exit();
    }
    
    else
    {
        header("Location: admin_page.php?username=" . $_POST["username"] . "&action=banned");
        
        exit();
    }
?>