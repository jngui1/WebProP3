<?php
// allows the react client to access the php output
// TODO change origin to place of react home page for safety
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type");

// turns off all error reporting, so only json is outputted
error_reporting(0);

$json = file_get_contents("php://input");
// echo $json;

$object = json_decode($json);
$method = $object->method;



if ($method === "move") {
    $move = $object->move;
    $cells = $object->cells;

    $MAXROW = count($cells);
    $MAXCOLUMN = count($cells[0]);

    for ($i = 0; $i < $move; $i++) {
        $cells = generate_next();
    }
    echo json_encode(["cells" => $cells]);
} else if ($method === "start_session") {
    session_start();

    $username = $object->username;
    if (!($_SESSION["username"])) {
        $_SESSION["username"] = $username;
        $_SESSION["simulations"] = 0;
    }
    echo json_encode(["code" => 0]);
    
} else if ($method === "get_session") {
    echo json_encode(["username" => $_SESSION["username"]]);
} else if ($method === "end_session") {
    session_start();
    session_unset();
    session_destroy();

    echo json_encode(["code" => 0]);
}

function generate_next(): array
{
    global $MAXROW, $MAXCOLUMN;
    $nextCells = array_fill(0, $MAXROW, array_fill(0, $MAXCOLUMN, 0));
    for ($r = 0; $r < $MAXROW; $r++) {
        for ($c = 0; $c < $MAXCOLUMN; $c++) {
            $value = determine_fate($r, $c);
            $nextCells[$r][$c] = $value;
        }
    }
    return $nextCells;
}

function determine_fate($r, $c): int
{
    global $cells;
    $change = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
    $numberNeighbors = 0;
    for ($i = 0; $i < count($change); $i++) {
        $x = $change[$i][0];
        $y = $change[$i][1];
        $numberNeighbors += viable_cell($r + $x, $c + $y);
    }
    if ($cells[$r][$c] == 0 || $numberNeighbors == 3) {
        return $numberNeighbors == 3;
    } else if ($numberNeighbors < 2 || $numberNeighbors > 3) {
        return 0;
    } else {
        return 1;
    }
}
function viable_cell($r, $c): int
{
    global $MAXROW, $MAXCOLUMN, $cells;
    if ($r < 0 || $r >= $MAXROW || $c < 0 || $c >= $MAXCOLUMN || $cells[$r][$c] == 0) {
        return 0;
    } else {
        return 1;
    }
}
// $response = array("success" => true, "message" => $content);
// echo json_encode($_POST);