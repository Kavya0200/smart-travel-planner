function DayPlan({ day, plans = [], onDeletePlan }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-3">Day {day}</h3>

      {plans.length === 0 ? (
        <p className="text-gray-500">No plans added for this day.</p>
      ) : (
        <ul className="space-y-2">
          {plans.map((plan) => (
            <li
              key={plan.id}
              className="flex items-center justify-between border p-2 rounded"
            >
              <div>
                <p className="font-medium">{plan.title}</p>
                <p className="text-sm text-gray-500">{plan.time}</p>
              </div>

              <button
                onClick={() => onDeletePlan(day, plan.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DayPlan;