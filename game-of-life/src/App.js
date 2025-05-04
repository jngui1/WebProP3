import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Simulation from "./pages/Simulation/Simulation";
import Dashboard from "./pages/Dashboard/Dashboard";
function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* The Routes decides which component to show based on the current URL.*/}
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signup" element={<Signup/>} />
                    <Route path="/simulation" element={<Simulation/>} />
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    </Routes>
            </Router>
        </div>
    );
}

export default App;
