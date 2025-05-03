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
        <div><h1>Conway's Game of Life</h1></div>
        
        <form action="user_page.php" method="POST">
            <label for="username">Username</label>
            
            <input type="text" id="username" name="username">
            
            <label for="password">Password</label>
            
            <input type="text" id="password" name="password">
            
            <input type="submit" value="Enter Simulation">
            
        </form>
        
        <button type="button" onclick="window.location.assign('create_account.php')">
    
    </body>
    
</html>