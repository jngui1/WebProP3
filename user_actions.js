function inviteFriend(event)
{
    event.preventDefault();
    const email = document.getElementById('email').value;
    let url = window.location.href;
    url = url.substring(0, url.lastIndexOf('/'));
    window.location.href = `mailto:${email}?subject=Play Conway's Game of Life&body=Hello! You can play the Game of Life at ${url}/index.php`;
}

function addWishlist(event)
{
    const item = document.getElementById('wishlist').value.trim;
    
    if (item === "")
    {
        event.preventDefault();
        alert("Invalid wishlist value");
    }
}

document.getElementById("invite_form").addEventListener("submit", function(event){inviteFriend(event);});

document.getElementById("wishlist_form").addEventListener("submit", function(event){addWishlist(event);});