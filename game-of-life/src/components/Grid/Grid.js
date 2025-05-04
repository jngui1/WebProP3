import React, { useState } from "react";
import "whatwg-fetch";

function Cell({ value, onCellClick }) {
    return (
        <button
            style={{ backgroundColor: value ? "white" : "black" }}
            className="cell"
            onClick={onCellClick}
        >
            {value}
        </button>
    );
}
export default function Grid({ CellNumber }) {
    // constructor(props) {
    //     super(props);
    //     this.getPHP = this.getPHP.bind(this);
    // }
    // TODO remove 3, and set it to CellNumber
    const [Cells, setCells] = useState(
        Array.from(Array(3).fill(0), () => new Array(3))
    );
    console.log("Cells", Cells);
    function handleClick(i, j) {
        // Cells[i][j] ^= 1;
        setCells([
            [1, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
        console.log(Cells[i][j] === 0);
    }
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
    // TODO set the grid to a bariable width anheight based on cellNumber
    return (
        <>
            <p className="mainText">JUST REACT</p>
            <button onClick={getPHP}>Load</button>

            <div className="board-row">
                <button
                    style={{ backgroundColor: Cells[0][0] ? "white" : "black" }}
                    className="cell"
                    onClick={handleClick.bind((0, 0))}
                ></button>
                <Cell
                    value={Cells[0][1]}
                    onCellClick={() => handleClick(0, 1)}
                />
                <Cell
                    value={Cells[0][2]}
                    onCellClick={() => handleClick(0, 2)}
                />
            </div>
            <div className="board-row">
                <Cell
                    value={Cells[1][0]}
                    onCellClick={() => handleClick(1, 0)}
                />
                <Cell
                    value={Cells[1][1]}
                    onCellClick={() => handleClick(1, 1)}
                />
                <Cell
                    value={Cells[1][2]}
                    onCellClick={() => handleClick(1, 2)}
                />
            </div>
            <div className="board-row">
                <Cell
                    value={Cells[2][0]}
                    onCellClick={() => handleClick(2, 0)}
                />
                <Cell
                    value={Cells[2][1]}
                    onCellClick={() => handleClick(2, 1)}
                />
                <Cell
                    value={Cells[2][2]}
                    onCellClick={() => handleClick(2, 2)}
                />
            </div>
            <p>{Cells[0][0]}</p>
        </>
    );
}
