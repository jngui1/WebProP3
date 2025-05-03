<?php
session_start();
?>
<!DOCTYPE html>

<html lang="en">

<head>
       <title>Conway's Game of Life - Dashboard</title>

       <meta charset="UTF-8">

       <link rel="stylesheet" type="text/css" href="layout.css">

</head>

<body>
       <div>
              <h1>[username]'s Dashboard</h1>
       </div>

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
                     function inviteFriend(event) {
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
                     function addWishlist() {
                            const item = document.getElementById('wishlist').value;
                            alert(`not implemented yet, item: ${item}`);
                     }
              </script>
       </div>

</body>

</html>