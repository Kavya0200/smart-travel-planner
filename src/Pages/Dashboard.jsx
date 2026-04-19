import { useState, useEffect } from "react";
import { auth } from "../services/firebase";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { addTrip, getTrips, deleteTrip } from "../services/tripService";

function Dashboard() {
  const [destination, setDestination] = useState("");
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) fetchTrips();
  }, [user]);

  const fetchTrips = async () => {
    const data = await getTrips(user.uid);
    setTrips(data);
  };

  const handleAddTrip = async (e) => {
    e.preventDefault();
    if (!destination) return;
    await addTrip({ destination, userId: user.uid, createdAt: new Date() });
    setDestination("");
    fetchTrips();
  };

  const handleDelete = async (id) => {
    await deleteTrip(id);
    fetchTrips();
  };

  return (
    <div style={{ padding: "40px", background: "#0f172a", minHeight: "100vh", color: "white" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>My Trips ✈️</h1>
        <button onClick={async () => { await logout(); navigate("/"); }} style={{ background: "red", color: "white", border: "none", padding: "10px", borderRadius: "5px", cursor: "pointer" }}>Logout</button>
      </div>
      
      <form onSubmit={handleAddTrip} style={{ margin: "20px 0" }}>
        <input 
          type="text" 
          placeholder="Where to?" 
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", width: "250px" }}
        />
        <button type="submit" style={{ padding: "10px", marginLeft: "10px", background: "blue", color: "white", border: "none", borderRadius: "5px" }}>Add</button>
      </form>

      <div>
        {trips.map(trip => (
          <div key={trip.id} style={{ background: "#1e293b", padding: "15px", margin: "10px 0", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
            <span>{trip.destination}</span>
            <button onClick={() => handleDelete(trip.id)} style={{ color: "red", background: "none", border: "none", cursor: "pointer" }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;