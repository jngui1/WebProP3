<?php
    session_start();

    if (!($_SESSION["userID"]))
    {
        require_once("db_username.php");
        
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
            
            else if($row["isBanned"] === "1")
            {
                header("Location: index.php?banned=true");
            
                exit();
            }
            
            else if($row["isSuspended"] === "1")
            {
                header("Location: index.php?suspended=true");
            
                exit();
            }
            
            else
            {
                $_SESSION["userID"] = $row["userID"];
                $_SESSION["username"] = $_POST["username"];
                $_SESSION["isAdmin"] = $row["isAdmin"];
            }
            
            if($row["isAdmin"] === "1")
            {
                header("Location: admin_page.php");
            
                exit();
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

        <div class="vertical-stack" style="position: absolute; bottom: 10vh; left: 15vw;">
            <form id="invite_form" class="vertical-stack-center">
                <label for="email">Friend's email</label>
                
                <input type="email" id="email" name="email" required>
                
                <input type="submit" value="Invite Friend">
                
            </form>
            
        </div>
        
        <div class="vertical-stack-center">
            <button type="button" onclick="window.location.assign('grid/index.html')">
                Begin Simulation
            </button>
        </div>

        <div class ="vertical-stack" style="position: absolute; bottom: 10vh; right: 15vw;">
            <form id="wishlist_form" action="add_wishlist.php" method="POST" class="vertical-stack-center">
                <label for="wishlist">Wishlist Item</label>
                
                <input type="text" id="wishlist" name="wishlist" required>
                
                <input type="submit" value="Add to Wishlist">
                
            </form>
            
        </div>
        
        <div class="vertical-stack-center">
          <button type="button" onclick="window.location.assign('index.php')">
            Sign Out
          </button>
        </div>

        <script type="text/javascript" src="user_actions.js"></script>
        
    </body>

</html>