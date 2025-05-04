<?php
    session_start();
    
    // When adding to your CODD files, use your GSU Username
    $db_username = "username";
    
    $conn = new mysqli("localhost", $db_username, $db_username, $db_username);
    
    /*
    $drop_table_SQL = "DROP TABLE Wishlists;";
    
    $conn->query($drop_table_SQL);
    */
    
    $create_table_SQL = "CREATE TABLE Wishlists(
        userID INT UNSIGNED NOT NULL,
        wish VARCHAR(5000) NOT NULL,
        FOREIGN KEY (userID) REFERENCES Users(userID)
    );";
    
    try
    {
        $conn->query($create_table_SQL);
    }
    
    catch (mysqli_sql_exception $error){/*echo $conn->error;*/}
    
    $add_wish_SQL = "INSERT INTO Wishlists (UserID, wish)
        VALUES (" . $_SESSION["userID"] . ", '" . $_POST["wishlist"] . "');";
        
    $conn->query($add_wish_SQL);
    
    /*
    $check_for_wish_SQL = "SELECT * FROM Wishlists;";
    
    $result = $conn->query($check_for_wish_SQL);
    
    while($row = $result->fetch_assoc())
    {
        echo $row["userID"] . " " . $row["wish"];
    }
    */
    
    $conn->close();
    
    header("Location: user_page.php?added_wish=true");
    
    exit();
?>