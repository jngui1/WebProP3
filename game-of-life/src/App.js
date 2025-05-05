import "./App.css";

import Simulation from "./components/Grid/Simulation";
function App() {
    return (
        <div className="App">
            <Simulation numberRows={10} numberColumns={10} />
        </div>
    );
}

export default App;
