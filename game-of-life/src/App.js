import "./App.css";

import Simulation from "./components/Grid/Simulation";
function App() {
    return (
        <div className="App">
            <Simulation numberRows={15} numberColumns={15} />
        </div>
    );
}

export default App;
