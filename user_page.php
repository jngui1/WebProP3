<?php
    session_start();

    if (!($_SESSION["userID"]))
    {
        // When adding to your CODD files, use your GSU Username
        $db_username = "username";
        
        $conn = new mysqli("localhost", $db_username, $db_username, $db_username);
        
        $check_for_user_SQL = "SELECT * FROM Users WHERE username = '" . $_POST["username"] . "';";
        
        $result = $conn->query($check_for_user_SQL);
        
        if ($result->num_rows < 1)
        {
            header("Location: index.php?error=true");
            
            exit();
        }
        
        else
        {
            $row = $result->fetch_assoc();
            
            if(password_verify($_POST["password"], $row["passwordHash"]) === false)
            {
                header("Location: index.php?error=true");
            
                exit();
            }
            
            else
            {
                $_SESSION["userID"] = $row["userID"];
                $_SESSION["username"] = $_POST["username"];
            }
        }
        
        $conn->close();
    }
    
    if ($_GET["added_wish"] === "true")
    {
        $wish_added_alert = "<script>alert('Your wish has been added to the wishlist.');</script>";
    }
    
    else
    {
        $wish_added_alert = "";
    }
?>
<!DOCTYPE html>

<html lang="en">
    <head>
        <title>Conway's Game of Life - Dashboard</title>

        <meta charset="UTF-8">

        <link rel="stylesheet" type="text/css" href="layout.css">
        
        <?= $wish_added_alert ?>

    </head>

    <body>
        <div><h1><?= $_SESSION["username"] ?>'s Dashboard</h1></div>

        <div></div>

        <div class="vertical-stack-center" style="margin-top: 50px;">
            <h3>Play Time: # hours</h3>
            <h3>Simulations Ran: #</h3>
        </div>

        <div class="vertical-stack" style="position: absolute; top: 600px; left: 350px;">
            <form id="invite_form" class="vertical-stack-center">
                <label for="email">Friend's email</label>
                
                <input type="email" id="email" name="email" required>
                
                <input type="submit" value="Invite Friend">
                
            </form>
            
        </div>
        
        <div style="position: absolute; top: 735px; left: 800px">
            <button type="button" onclick="window.location.assign('grid/index.html')">
                Begin Simulation
            </button>
        </div>

        <div class ="vertical-stack" style="position: absolute; top: 600px; right: 350px;">
            <form id="wishlist_form" action="add_wishlist.php" method="POST" class="vertical-stack-center">
                <label for="wishlist">Wishlist Item</label>
                
                <input type="text" id="wishlist" name="wishlist" required>
                
                <input type="submit" value="Add to Wishlist">
                
            </form>
            
        </div>
        
        <script type="text/javascript" src="user_actions.js"></script>
        
    </body>

</html>