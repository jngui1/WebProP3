import { Link } from "react-router-dom";
function Home() {
    function signIn(formData) {
        const username = formData.get("username");
        const password = formData.get("password");
        //TODO parse username and password 
        alert(`Username: ${username}, Password: ${password}`);
    }
    return (
        <>
            <header>Conway's Game of Life</header>
            <form action={signIn}>
                <div className="inputField">
                    <p>Username</p>
                    <input name="username" />
                </div>
                <div className="inputField">
                    <p>Password</p>
                    <input name="password" />
                </div>
                <button type="submit">Enter Simulation</button>
            </form>
            <Link to="/Signup"><button>Create Account</button></Link>
        </>
    );
}

export default Home;
