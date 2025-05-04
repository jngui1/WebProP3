let signup_form = document.getElementById("signup_form");

function submit(event)
{
    let username = document.getElementById("username").value;
    let confirm_username = document.getElementById("confirm_username").value;
    
    let email = document.getElementById("email").value;
    let confirm_email = document.getElementById("confirm_email").value;
    
    let password = document.getElementById("password").value;
    let confirm_password = document.getElementById("confirm_password").value;
    
    if (username !== confirm_username)
    {
        alert("Usernames do not match");
        
        event.preventDefault();
    }
    
    else if (email !== confirm_email)
    {
        alert("Emails do not match");
        
        event.preventDefault();
    }
    
    else if (password !== confirm_password)
    {
        alert("Passwords do not match");
        
        event.preventDefault();
    }
}

signup_form.addEventListener("submit", function(event){submit(event);});