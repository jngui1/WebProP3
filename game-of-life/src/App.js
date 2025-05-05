import logo from "./logo.svg";
import "./App.css";

import Simulation from "./components/Grid/Simulation";
function App() {
    return (
        <div className="App">
            <Simulation numberRows={8} numberColumns={18} />
        </div>
    );
}

export default App;
