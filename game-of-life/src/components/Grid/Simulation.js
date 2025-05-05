import React, { useState } from "react";
import "whatwg-fetch";
import "./Simulation.css";
import { apiRequest } from "../../commons/commons";
import { useNavigate } from "react-router-dom";

function Simulation({ numberRows = 15, numberColumns = 15 }) {
    const [cells, setCells] = useState(
        Array.from(Array(numberRows), (_) => Array(numberColumns).fill(0))
    );
    const navigate = useNavigate();
    const [generationCount, setGenerationCount] = useState(0);
    const gridLayout = (
        <table className="centered">
            <tbody>
                {cells.map((row, i) => (
                    <tr key={i}>
                        {row.map((_, j) => (
                            <td
                                key={`${i}-${j}`}
                                value={cells[i][j]}
                                className="cell"
                                style={{
                                    backgroundColor: cells[i][j]
                                        ? "black"
                                        : "white",
                                }}
                                onClick={() => handleClick(i, j)}
                            ></td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
    const cellsRef = React.useRef(cells);
    React.useEffect(() => {
        cellsRef.current = cells;
    }, [cells]);
    function handleClick(rowIndex, colIndex) {
        const nextCells = cells.map((row, i) => {
            if (i === rowIndex) {
                return row.map((col, j) => {
                    if (j === colIndex) {
                        return col ^ 1;
                    } else {
                        return col;
                    }
                });
            } else {
                return row;
            }
        });
        setCells(nextCells);
    }
    function nextGeneration() {
        apiRequest(
            {
                method: "move",
                move: 1,
                cells: cellsRef.current,
            },
            function (response) {
                setGenerationCount(prevCount => prevCount + 1);
                setCells(response.cells);
            }
        );
    }
    function next23Generations() {
        apiRequest(
            {
                method: "move",
                move: 23,
                cells: cells,
            },
            function (response) {
                setGenerationCount(prevCount => prevCount + 23);
                setCells(response.cells);
            }
        );
    }
    const intervalRef = React.useRef(null);
    // calls nextGeneration every third of a second
    function start() {
        if (intervalRef.current === null) {
            intervalRef.current = setInterval(() => {
                nextGeneration();
            }, 333);
        }
    }
    function stop() {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }
    function reset() {
        setGenerationCount(0);
        setCells(
            Array.from(Array(numberRows), (_) => Array(numberColumns).fill(0))
        );
    }
    function logout() {
        apiRequest({ method: "end_session" }, function end_task(response) {
            window.location.href = "../index.php";
        });
    }

    function loadPattern(patternName) {
        const pattern = patterns[patternName];
        if (!pattern) return;

        // makes new grid with the pattern in the middle
        const newCells = Array.from(Array(numberRows), () =>
            Array(numberColumns).fill(0)
        );

        const startRow = Math.floor((numberRows - pattern.length) / 2);
        const startCol = Math.floor((numberColumns - pattern[0].length) / 2);

        pattern.forEach((row, i) => {
            row.forEach((value, j) => {
                newCells[startRow + i][startCol + j] = value;
            });
        });

        setCells(newCells);
    }

    const patterns = {
        glider: [
            [0, 1, 0],
            [0, 0, 1],
            [1, 1, 1],
        ],
        blinker: [
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 0],
        ],
        toad: [
            [0, 1, 1, 1],
            [1, 1, 1, 0],
        ],
        boat: [
            [1, 1, 0],
            [1, 0, 1],
            [0, 1, 0],
        ],
    };

    return (
        <>
            <h1>Conway's Game of Life</h1>
            <p>Generation #{generationCount}</p>
            {gridLayout}
            <div></div>
            <button onClick={start}>Start Game</button>
            <button onClick={next23Generations}>+23 Generations</button>
            <button onClick={stop}>Stop Game</button>
            <button onClick={reset}>Reset</button>
            <button onClick={logout}>Logout</button>
            <button onClick={nextGeneration}>Next Generation</button>
            <select onChange={(e) => loadPattern(e.target.value)}>
                <option value="">Select a Pattern</option>
                <option value="glider">Glider</option>
                <option value="blinker">Blinker</option>
                <option value="toad">Toad</option>
                <option value="boat">Boat</option>
            </select>
        </>
    );
}
export default Simulation;
