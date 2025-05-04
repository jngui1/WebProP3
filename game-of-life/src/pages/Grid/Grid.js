import React, { useState } from "react";
import "whatwg-fetch";
import "./Grid.css";
// type PHPQuery = {
//     move: int;
//     cells: list[list[int]]
// };
function Cell({ value, onCellClick }) {
    return (
        <button
            style={{ backgroundColor: value ? "black" : "white" }}
            className="cell"
            onClick={onCellClick}
        ></button>
    );
}
export default function Grid({ numberRows, numberColumns }) {
    const [Cells, setCells] = useState(
        Array.from(Array(numberRows), (_) => Array(numberColumns).fill(0))
    );
    const gridLayout = (
        <div className="grid">
            {Cells.map((row, i) => (
                <div className="row">
                    {row.map((_, j) => (
                        <Cell
                            value={Cells[i][j]}
                            onCellClick={() => handleClick(i, j)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
    function handleClick(rowIndex, colIndex) {
        const nextCells = Cells.map((row, i) => {
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
                cells: Cells,
            },
            setCells
        );
    }
    function next23Generations() {
        phpRequest(
            {
                move: 23,
                cells: Cells,
            },
            setCells
        );
    }

    function phpRequest(query, func) {
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
            <button onClick={nextGeneration}>Next Generation</button>
            <button onClick={next23Generations}>Next 23</button>
            {gridLayout}
        </>
    );
}
