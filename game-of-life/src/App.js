import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Simulation from "./pages/Simulation/Simulation";
import Dashboard from "./pages/Dashboard/Dashboard";
import Credits from "./pages/Credits/Credits";
import SignupSuccess from "./pages/Signup/SignupSuccess";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* The Routes decides which component to show based on the current URL.*/}
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signup" element={<Signup/>} />
                    <Route path="/signup_success" element={<SignupSuccess/>} />
                    <Route path="/simulation" element={<Simulation/>} />
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/admin" element={<AdminDashboard/>}/>
                    <Route path="/credits" element={<Credits/>}/>
                    </Routes>
            </Router>
        </div>
    );
}

export default App;
