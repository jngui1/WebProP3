import "./App.css";
import { Link } from "react-router-dom";
import Grid from "./pages/Grid/Grid";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* The Routes decides which component to show based on the current URL.*/}
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signup" element={<Signup/>} />
                </Routes>
            </Router>

            {/* <Link to="/signup">
                <button variant="outlined">Sign up</button>
            </Link> */}
            {/* <Grid numberRows={7} numberColumns={5} /> */}
        </div>
    );
}

export default App;
