import "./Signup.css";
function Signup() {
    function signUp(formData) {
        const username = formData.get("username");
        const password = formData.get("password");
        const email = formData.get("email");
        const confirmUsername = formData.get("c_username");
        const confirmPassword = formData.get("c_password");
        const confirmEmail = formData.get("c_email");
        //TODO parse username and password
        alert(`Username: ${username}, Password: ${password}, Email: ${email}, 
             Confirm User: ${confirmUsername}, Confirm Password: ${confirmPassword}, Confirm Email: ${confirmEmail}`);
    }
    return (
        <>
            <h3>Create Account</h3>
            <form action={signUp}>
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
            <button>Return to Login</button>
        </>
    );
}

export default Signup;
