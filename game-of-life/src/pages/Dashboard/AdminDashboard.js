import { sqlRequest } from "../../commons/commons";
import { useState, useEffect } from "react";

function AdminDashboard({ username = "Administration" }) {
    const unloadedTable = (
        <table className="centered">
            <thead>
                <tr>
                    <th>userID</th>
                    <th>usernames</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>2</td>
                </tr>
            </tbody>
        </table>
    );
    const [userTable, setUserTable] = useState(unloadedTable);
    useEffect(() => sqlRequest({ method: "get" }, parseTables), []);
    function parseTables(response) {
        setUserTable(
            <table className="centered">
                <thead>
                    <tr>
                        <th>userID</th>
                        <th>usernames</th>
                    </tr>
                </thead>
                <tbody>
                    {response.map((row, i) => (
                        <tr key={i}>
                            <td>{row[0]}</td>
                            <td>{row[1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    function suspend(formData) {
        const f_email = formData.get("f_email");
    }
    function ban(formData) {
        const item = formData.get("item");
    }
    return (
        <>
            <h1>{username}'s Dashboard</h1>
            <div className="stats">
                <div className="image">?</div>
                <p>Play Time: # hours</p>
                <p>Simulations Ran: #</p>
            </div>
            {userTable}
            <form className="footerButtons">
                <p>Username</p>
                <input type="text" name="username"></input>
                <button onClick={suspend}>Suspend User</button>
                <button onClick={ban}>Ban User</button>
            </form>
        </>
    );
}

export default AdminDashboard;
