import { Link, useNavigate } from "react-router-dom";
import { sqlRequest } from "../../commons/commons";
function Home() {
    const navigate = useNavigate();
    function signIn(formData) {
        const username = formData.get("username");
        const password = formData.get("password");
        //TODO parse username and password
        sqlRequest(
            { method: "check", username: username, password: password },
            handleResponse
        );
    }
    function handleResponse(response) {
        switch (response.code) {
            case 0:
                navigate("/dashboard", {
                    state: { username: response.username },
                });
                break;
            case 1:
                alert("An unknown error has occured");
                break;
            case 2:
                alert("You have the wrong username or password");
                break;
            default:
                console.log(response);
                break;
        }
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
            <Link to="/signup">
                <button>Create Account</button>
            </Link>
        </>
    );
}

export default Home;
