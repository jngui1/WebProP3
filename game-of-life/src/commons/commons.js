// type sqlQuery = {
//     method: "add" || "check",
//     username: string,
//     password: string,
//     email?: string,
// }
function sqlRequest(query, func) {
    fetch(`https://codd.cs.gsu.edu/~baladeselu1/WebPro/projects/3/mysql.php`, {
        method: "POST",
        headers: {},
        body: JSON.stringify(query),
    })
        .then((res) => res.json())
        .then((response) => {
            console.log("response");
            console.log(response);
            func(response);
        });
}
// type apiQuery = {
//     method: "move" || "cookie"
//     move: int,
//     cells: list[list[int]]
// };
function apiRequest(query, func) {
    fetch(`https://codd.cs.gsu.edu/~baladeselu1/WebPro/projects/3/api.php`, {
        method: "POST",
        headers: {},
        body: JSON.stringify(query),
    })
        .then((res) => res.json())
        .then((response) => func(response));
}
export { sqlRequest, apiRequest };
