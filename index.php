<?php
    session_start();
    
    session_unset();
    
    session_destroy();
    
    
    $hidden = "class='hidden'";
    
    $error_message = "";
    
    if ($_GET["error"] === "true")
    {
        $hidden = "";
        
        $error_message = "Invalid Information - Please Try Again";
    }
    
    else if ($_GET["banned"] === "true")
    {
        $hidden = "";
        
        $error_message = "Your Account Has Been Permanently Banned";
    }
    
    else if ($_GET["suspended"] === "true")
    {
        $hidden = "";
        
        $error_message = "Your Account Has Been Temporarily Suspended";
    }
?>
<!DOCTYPE html>

<html lang="en">
    <head>
        <title>Conway's Game of Life - Welcome</title>

        <meta charset="UTF-8">

        <link rel="stylesheet" type="text/css" href="layout.css">
        
    </head>

    <body>
        <div><h1 id="#header">Conway's Game of Life</h1></div>
        
        <div <?= $hidden ?>><h2><?= $error_message ?></h2></div>
        
        <div class="vertical-stack-center">
            <form class="vertical-stack-center" action="user_page.php" method="POST">
                <label for="username">Username</label><br>
                
                <input type="text" id="username" name="username" required><br>
                
                <label for="password">Password</label><br>
                
                <input type="password" id="password" name="password" required><br>
                
                <input type="submit" value="Enter Simulation">
            
            </form>
        </div>
        
        <div><button type="button" onclick="window.location.assign('create_account.php')">
            Create Account
        </button></div>
        
        <div><button type="button" onclick="window.location.assign('creators_page.html')">
            Link to Creator's Page
        </button></div>
    
    </body>
    
</html>