import { useState } from "react";
import DayPlan from "./DayPlan";

function ItineraryList({ itinerary = [], onAddPlan, onDeletePlan }) {
  const [day, setDay] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!day || !title || !time) {
      alert("Please fill all fields");
      return;
    }

    const newPlan = {
      id: Date.now(),
      title,
      time,
    };

    onAddPlan(Number(day), newPlan);
    setDay("");
    setTitle("");
    setTime("");
  };

  return (
    <div className="mt-6">
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-semibold mb-4">Itinerary Planner</h2>

        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            type="number"
            placeholder="Day number"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Place / activity"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Add Plan
          </button>
        </form>
      </div>

      <div>
        {itinerary.length === 0 ? (
          <p className="text-gray-500">No itinerary added yet.</p>
        ) : (
          itinerary.map((item) => (
            <DayPlan
              key={item.day}
              day={item.day}
              plans={item.plans}
              onDeletePlan={onDeletePlan}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ItineraryList;