import { Link } from "react-router-dom";
function SignupSuccess() {
    return (
        <>
            <h1>Welcone, [username]!, Your Account Has Been Created. </h1>
            <Link to="/">
                <button>Return to Login</button>
            </Link>
        </>
    );
}

export default SignupSuccess;
