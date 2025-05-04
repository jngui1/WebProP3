import React, { useState } from "react";
import "whatwg-fetch";

function Cell({ value, onCellClick }) {
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <button
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: value == 1 ? "black" : "white",
                    border: "1px solid black",
                    boxShadow: "none",
                }}
                onClick={onCellClick}
            ></button>
        </div>
    );
}
export default function Grid({width, height}) {
    // constructor(props) {
    //     super(props);
    //     this.getPHP = this.getPHP.bind(this);
    // }

    function getPHP() {
        fetch(`http://localhost:3000/api/demo.php`, {
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
    // create 2d array of cells all set to 0
    const [Cells, setCells] = useState(
        Array.from({ length: height }, () => Array(width).fill(0))
    );
    // reinitialize when grid size changes
    React.useEffect(() => {
        setCells(Array.from({ length: height }, () => Array(width).fill(0)));
    }, [width, height]);
    // handle cell click
    function handleCellClick(i, j) {
        // toggle cell value between 0 and 1 for clicked cell
        const newCells = Cells.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
                if (rowIndex == i && colIndex == j) {
                    if (cell == 0) {
                        cell = 1;
                    }
                    else {
                        cell = 0;
                    }
                }
                return cell;
            })
        );
        setCells(newCells);
    }
    function handleRunGeneration() {
        const nextGeneration = runGeneration({ cells: Cells });
        setCells(nextGeneration);
    }
    // dont try to access if not defined
    if (!Cells || Cells.length !== height || Cells[0].length !== width) {
        return null;
    }
    // create table based on grid width and height
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: `${width * 30}px`,
                    height: `${height * 30}px`,
                    gap: "0px"
                }}
            >
                {Cells.map((row, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "0px",
                            flex: "1"
                        }}
                    >
                        {row.map((cell, j) => (
                            <div
                                key={j}
                                style={{
                                    flex: "1",
                                    display: "flex",
                                    alignItems: "stretch",
                                    justifyContent: "stretch"
                                }}
                            >
                                <Cell
                                    value={cell}
                                    onCellClick={() => handleCellClick(i, j)}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button onClick={handleRunGeneration}>Run Generation</button>
        </>
    );
}

function getActiveNeighborCount({ cells, row, col }) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            // skip the cell itself
            if (i == 0 && j == 0) {
                continue;
            }
            // check if cell is in bounds
            if (row + i < 0 || row + i >= cells.length) {
                continue;
            }
            if (col + j < 0 || col + j >= cells[0].length) {
                continue;
            }
            // check if cell is alive
            if (cells[row + i][col + j] == 1) {
                count++;
            }
        }
    }
    return count;
}

function runGeneration({ cells }) {
    // create new array to store next generation
    const newCells = cells.map((row) => row.slice());
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[0].length; j++) {
            const count = getActiveNeighborCount({ cells, row: i, col: j });
            if (cells[i][j] == 1) {
                // cell is alive
                if (count < 2 || count > 3) {
                    newCells[i][j] = 0;
                }
            } else {
                // cell is dead
                if (count == 3) {
                    newCells[i][j] = 1;
                }
            }
        }
    }
    return newCells;
}