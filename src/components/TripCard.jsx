import { Link } from "react-router-dom";

function TripCard({ trip, onDelete }) {
  return (
    <div className="trip-card">
      <h3>{trip.name}</h3>
      <p>Destination: {trip.destination}</p>
      <p>Budget: ₹{trip.budget}</p>
      <div className="trip-card-actions">
        <Link to={`/trip/${trip.id}`}>View Details</Link>
        <button onClick={() => onDelete(trip.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TripCard;