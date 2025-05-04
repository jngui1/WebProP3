import { Link, useLocation } from "react-router-dom";

function Dashboard() {
    const location = useLocation();
    const username = location.state.username;
    function inviteFriend(formData) {
        const f_email = formData.get("f_email");
    }
    function wishlist(formData) {
        const item = formData.get("item");
    }
    return (
        <>
            <h1>{username}'s Dashboard</h1>
            <div className="stats">
                <div className="circle">?</div>
                <p>Play Time: # hours</p>
                <p>Simulations Ran: #</p>
            </div>
            <div className="footerButtons">
                <form action={inviteFriend} className="inputField">
                    <p>Friend's email</p>
                    <input type="text" name="f_email"></input>
                    <button type="submit">Invite Friend</button>
                </form>
                <Link to="/simulation">
                    <button>Begin Simulation</button>
                </Link>
                <form action={wishlist} className="inputField">
                    <p>Wishlist Item</p>
                    <input type="text" name="item"></input>
                    <button type="submit">Add to Wishlist</button>
                </form>
            </div>
        </>
    );
}

export default Dashboard;
