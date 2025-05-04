<?php
    session_start();
    
    session_unset();
    
    session_destroy();
?>
<!DOCTYPE html>

<html lang="en">
    <head>
        <title>Conway's Game of Life - Welcome</title>

        <meta charset="UTF-8">

        <link rel="stylesheet" type="text/css" href="layout.css">
        
    </head>

    <body>
        <div><h1 style="padding-top: 4vh" >Conway's Game of Life</h1></div>
        
        <div class="vertical-stack-center">
        <form class="vertical-stack-center">
            <label for="username">Username</label><br>
            
            <input type="text" id="username" name="username" required><br>
            
            <label for="password">Password</label><br>
            
            <input type="password" id="password" name="password" required><br>
            
            <input type="submit" value="Enter Simulation">
            
        </form>

        <button type="button" onclick="window.location.assign('create_account.php')">Create Account</button>
        </div>    
    </body>
    
</html>