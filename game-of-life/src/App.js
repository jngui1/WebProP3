import logo from "./logo.svg";
import "./App.css";

import Grid from "./components/Grid/Grid";
function App() {
    return (
        <div className="App">
            <h1>grid</h1>
            <Grid width={8} height={15} />
        </div>
    );
}

export default App;
