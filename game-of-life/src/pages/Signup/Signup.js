import "./Signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sqlRequest } from "../../commons/commons";
function Signup() {
    const [hidden, setHidden] = useState(true);
    const navigate = useNavigate();

    function handleSignUp(formData) {
        setHidden(true);
        const username = formData.get("username");
        const password = formData.get("password");
        const email = formData.get("email");
        const confirmUsername = formData.get("c_username");
        const confirmPassword = formData.get("c_password");
        const confirmEmail = formData.get("c_email");
        //TODO parse username and password
        if (username !== confirmUsername) {
            alert("Usernames do not match!");
        } else if (password !== confirmPassword) {
            alert("Passwords do not match!");
        } else if (email !== confirmEmail) {
            alert("Emails do not match!");
        } else {
            sqlRequest(
                {
                    method: "add",
                    username: username,
                    password: password,
                    email: email,
                },
                handleResponse
            );
        }
    }
    function handleResponse(response) {
        switch (response.code) {
            case 0:
                navigate("/signup_success", { replace: true });
                break;
            case 1:
                alert("An unknown error has occured.");
                break;
            case 2:
                setHidden(false);
                break;
            default:
                console.log(response);
                break;
        }
    }
    
    return (
        <>
            <h3>Create Account</h3>
            <p hidden={hidden}>Username is already in use!</p>
            <form action={handleSignUp}>
                <div className="formGrid">
                    <div className="inputField">
                        <p>Username</p>
                        <input name="username" />
                    </div>
                    <div className="inputField">
                        <p>Email</p>
                        <input name="email" />
                    </div>
                    <div className="inputField">
                        <p>Password</p>
                        <input name="password" />
                    </div>
                    <div className="inputField">
                        <p>Confirm Username</p>
                        <input name="c_username" />
                    </div>
                    <div className="inputField">
                        <p>Confirm Email</p>
                        <input name="c_email" />
                    </div>
                    <div className="inputField">
                        <p>Confirm Password</p>
                        <input name="c_password" />
                    </div>
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <Link to="/">
                <button>Return to Login</button>
            </Link>
        </>
    );
}

export default Signup;
