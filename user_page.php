<?php
    session_start();

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
            $_SESSION["username"] = $_POST["username"];
        }
    }
    
    $conn->close();
?>
<!DOCTYPE html>

<html lang="en">
    <head>
        <title>Conway's Game of Life - Dashboard</title>

        <meta charset="UTF-8">

        <link rel="stylesheet" type="text/css" href="layout.css">

    </head>

    <body>
        <div><h1><?= $_SESSION["username"] ?>'s Dashboard</h1></div>

        <div></div>

        <div>
            <p>Play Time: # hours</p>
            <p>Simulations Ran: #</p>
        </div>

        <div>
            <form onsubmit="inviteFriend(event)">
                <label for="email">Friend's email</label>
                <input type="email" id="email" name="email" required>
                <input type="submit" value="Invite Friend">
            </form>

            <script>
                function inviteFriend(event)
                {
                    event.preventDefault();
                    const email = document.getElementById('email').value;
                    let url = window.location.href;
                    url = url.substring(0, url.lastIndexOf('/'));
                    window.location.href = `mailto:${email}?subject=Play Conway's Game of Life&body=Hello! You can play the Game of Life at ${url}/index.php`;
                }
            </script>
        </div>

        <div>
            <form>
                <label for="wishlist">Wishlist Item</label>
                <input type="text" id="wishlist" name="wishlist" required>
                <input type="button" onclick="addWishlist()" value="Add to Wishlist">
            </form>

            <script>
                function addWishlist()
                {
                    const item = document.getElementById('wishlist').value;
                    alert(`not implemented yet, item: ${item}`);
                }
            </script>
            
        </div>
        
        <div><button type="button" onclick="window.location.assign('grid/index.html')">
            Begin Simulation
        </button></div>

    </body>

</html>