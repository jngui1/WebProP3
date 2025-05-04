<?php
    session_start();
    
    session_unset();
    
    session_destroy();
    
    if ($_GET["error"] === "true")
    {
        $hidden = "";
    }
    
    else
    {
        $hidden = "class='hidden'";
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
        
        <div <?= $hidden ?>>
            <h2>Invalid Information - Please Try Again</h2>
            
        </div>
        
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
    
    </body>
    
</html>