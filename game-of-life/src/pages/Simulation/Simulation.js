import React, { useState } from "react";
import "whatwg-fetch";
import "./Simulation.css";
// type PHPQuery = {
//     move: int;
//     cells: list[list[int]]
// };


function Simulation({ numberRows, numberColumns }) {
    // TODO remove hardcoded numberRows and numberColumns once login page functionality finished.
    const [cells, setCells] = useState(
        Array.from(Array(4), (_) => Array(4).fill(0))
    );
    const [generationCount, setGenerationCount] = useState(0);
    const gridLayout = (
        <table class="centered">
            <tbody>
                {cells.map((row, i) => (
                    <tr>
                        {row.map((_, j) => (
                            <td
                                value={cells[i][j]}
                                className="cell"
                                style={{
                                    backgroundColor: cells[i][j]
                                        ? "black"
                                        : "white",
                                }}
                                onClick={() => handleClick(i, j)}
                            >
                            </td>
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
        phpRequest(
            {
                move: 1,
                cells: cells,
            },
            function (response) {
                setGenerationCount(generationCount + 1);
                setCells(response);
            }
        );
    }
    function next23Generations() {
        phpRequest(
            {
                move: 23,
                cells: cells,
            },
            function (response) {
                setGenerationCount(generationCount + 23);
                setCells(response);
            }
        );
    }
    function start() {}
    function stop() {}
    function reset() {
        setGenerationCount(0);
        setCells(Array.from(Array(4), (_) => Array(4).fill(0)));
    }
    function logout() {}
    function phpRequest(query, func, ...args) {
        fetch(
            `https://codd.cs.gsu.edu/~baladeselu1/WebPro/projects/3/api.php`,
            {
                method: "POST",
                headers: {},
                body: JSON.stringify(query),
            }
        )
            .then((res) => res.json())
            .then((response) => func(response));
    }
    return (
        <>
            <h1>Conway's Game of Life</h1>
            <p>Generation #{generationCount}</p>
            {gridLayout}
            <button onclick={start}>Start Game</button>
            <button onclick={stop}>Stop Game</button>
            <button onClick={nextGeneration}>Next Generation</button>
            <button onClick={next23Generations}>+23 Generations</button>
            <button onclick={reset}>Reset</button>
            <button onclick={logout}>Logout</button>
        </>
    );
}
export default Simulation;
