import React, { useState } from "react";
import "whatwg-fetch";
import "./Grid.css";
function Cell({ value, onCellClick }) {
    return (
        <button
            style={{ backgroundColor: value ? "black" : "white" }}
            className="cell"
            onClick={onCellClick}
        >
        </button>
    );
}
export default function Grid({ CellNumber }) {
    const [Cells, setCells] = useState(
        Array.from(Array(CellNumber), (_) => Array(CellNumber).fill(0))
    );
    const gridLayout = (
        <div className="grid">
            {Cells.map((row, i) => (
                <div className="row">
                    {row.map((_, j) => (
                        <Cell
                            value={Cells[i][j]}
                            onCellClick={() => handleClick(i, j)} />
                    ))}
                </div>
            ))}
        </div>
    );
    console.log("Cells", Cells);
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
        console.log(Cells[rowIndex][colIndex] === 0);
    }
    function getPHP() {
        fetch(`http://localhost:3000/api/api.php`, {
            method: "POST",
            headers: {},
            body: JSON.stringify({
                move: true,
                cells: Cells,
            }),
        })
            .then((res) => res.json())
            .then((response) => {
                console.log("response");
                console.log(response);
            });
    }
    return (
        <>
            <p className="mainText">JUST REACT</p>
            <button onClick={getPHP}>Load</button>
            {gridLayout}
        </>
    );
}
