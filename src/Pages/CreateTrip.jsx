import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { TripContext } from "../context/TripContext";

function CreateTrip() {
  const { addTrip } = useContext(TripContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    budget: "",
    itinerary: [],
    expenses: [],
    documents: [],
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addTrip({
        ...formData,
        budget: Number(formData.budget),
      });
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <form className="trip-form" onSubmit={handleSubmit}>
          <h2>Create Trip</h2>

          <input
            type="text"
            name="name"
            placeholder="Trip name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={formData.destination}
            onChange={handleChange}
          />

          <input
            type="number"
            name="budget"
            placeholder="Total budget"
            value={formData.budget}
            onChange={handleChange}
          />

          <button type="submit">Create Trip</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTrip;