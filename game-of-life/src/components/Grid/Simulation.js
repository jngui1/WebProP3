import React, { useState } from "react";
import "whatwg-fetch";
import "./Simulation.css";
import { apiRequest } from "../../commons/commons";
import { Navigate, useNavigate } from "react-router-dom";

function Simulation({ numberRows = 8, numberColumns = 8 }) {
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
                cells: cells,
            },
            function (response) {
                setGenerationCount(generationCount + 1);
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
                setGenerationCount(generationCount + 23);
                setCells(response.cells);
            }
        );
    }
    function start() {}
    function stop() {}
    function reset() {
        setGenerationCount(0);
        setCells(
            Array.from(Array(numberRows), (_) => Array(numberColumns).fill(0))
        );
    }
    function logout() {
        apiRequest({ method: "end_session" }, function end_task(response) {
            navigate("/");
        });
    }

    return (
        <>
            <h1>Conway's Game of Life</h1>
            <p>Generation #{generationCount}</p>
            {gridLayout}
            <button onClick={start}>Start Game</button>
            <button onClick={stop}>Stop Game</button>
            <button onClick={nextGeneration}>Next Generation</button>
            <button onClick={next23Generations}>+23 Generations</button>
            <button onClick={reset}>Reset</button>
            <button onClick={logout}>Logout</button>
        </>
    );
}
export default Simulation;
