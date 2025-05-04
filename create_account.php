<!DOCTYPE html>

<html lang="en">
    <head>
        <title>Conway's Game of Life - Create Account</title>

        <meta charset="UTF-8">

        <link rel="stylesheet" type="text/css" href="layout.css">
        
    </head>

    <body>
        <div><h2>Create Account</h2></div>
        
        <div class="vertical-stack-center"><form id="signup_form" action="signup_confirm.php" method="POST" class="vertical-stack-center">
            <table>
                <tr>
                    <td>
                        <label for="username">Username</label><br>
                    
                        <input type="text" id="username" name="username" required>
                        
                    </td>
                    
                    <td>
                        <label for="confirm_username">Confirm Username</label><br>
                        
                        <input type="text" id="confirm_username" name="confirm_username" required>
                        
                    </td>
                    
                </tr>
            
                <tr>
                    <td>
                        <label for="email">Email</label><br>
                    
                        <input type="email" id="email" name="email" required>
                        
                    </td>
                    
                    <td>
                        <label for="confirm_email">Confirm Email</label><br>
                        
                        <input type="email" id="confirm_email" name="confirm_email" required>
                        
                    </td>
                    
                </tr>
                
                <tr>
                    <td>
                        <label for="password">Password</label><br>
                    
                        <input type="password" id="password" name="password" required>
                        
                    </td>
                    
                    <td>
                        <label for="confirm_password">Confirm Password</label><br>
                        
                        <input type="password" id="confirm_password" name="confirm_password" required>
                        
                    </td>
                    
                </tr>
                
            </table>
            
            <input type="submit" value="Sign Up">
        
        </form></div>
        
        <div class="vertical-stack-center"><button type="button" onclick="window.location.assign('index.php')">
            Return to Login
        </button></div>
        
        <script type="text/javascript" src="new_account_submit.js"></script>
    
    </body>
    
</html>