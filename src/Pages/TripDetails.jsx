import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { TripContext } from "../context/TripContext";

function TripDetails() {
  const { tripId } = useParams();
  const { fetchTripById, editTrip } = useContext(TripContext);

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [day, setDay] = useState("");
  const [plan, setPlan] = useState("");

  useEffect(() => {
    const loadTrip = async () => {
      try {
        const data = await fetchTripById(tripId);
        setTrip(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTrip();
  }, [tripId, fetchTripById]);

  const totalExpenses = useMemo(() => {
    if (!trip?.expenses) return 0;
    return trip.expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  }, [trip]);

  const remainingBudget = useMemo(() => {
    return (trip?.budget || 0) - totalExpenses;
  }, [trip, totalExpenses]);

  const handleAddExpense = async (e) => {
    e.preventDefault();

    const newExpense = {
      id: Date.now(),
      title: expenseTitle,
      amount: Number(expenseAmount),
    };

    const updatedExpenses = [...(trip.expenses || []), newExpense];
    await editTrip(tripId, { expenses: updatedExpenses });
    setTrip((prev) => ({ ...prev, expenses: updatedExpenses }));
    setExpenseTitle("");
    setExpenseAmount("");
  };

  const handleAddPlan = async (e) => {
    e.preventDefault();

    const newPlan = {
      id: Date.now(),
      day,
      plan,
    };

    const updatedItinerary = [...(trip.itinerary || []), newPlan];
    await editTrip(tripId, { itinerary: updatedItinerary });
    setTrip((prev) => ({ ...prev, itinerary: updatedItinerary }));
    setDay("");
    setPlan("");
  };

  if (loading) return <Loader />;
  if (!trip) return <p>Trip not found</p>;

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h1>{trip.name}</h1>
        <p>Destination: {trip.destination}</p>
        <p>Total Budget: ₹{trip.budget}</p>
        <p>Total Expenses: ₹{totalExpenses}</p>
        <p>Remaining Budget: ₹{remainingBudget}</p>

        <div className="details-grid">
          <div className="details-card">
            <h2>Add Expense</h2>
            <form onSubmit={handleAddExpense}>
              <input
                type="text"
                placeholder="Expense title"
                value={expenseTitle}
                onChange={(e) => setExpenseTitle(e.target.value)}
              />
              <input
                type="number"
                placeholder="Amount"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
              />
              <button type="submit">Add Expense</button>
            </form>

            <h3>Expense List</h3>
            {(trip.expenses || []).map((expense) => (
              <p key={expense.id}>
                {expense.title} - ₹{expense.amount}
              </p>
            ))}
          </div>

          <div className="details-card">
            <h2>Add Itinerary</h2>
            <form onSubmit={handleAddPlan}>
              <input
                type="text"
                placeholder="Day 1 / Day 2"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              />
              <input
                type="text"
                placeholder="Plan details"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
              />
              <button type="submit">Add Plan</button>
            </form>

            <h3>Itinerary List</h3>
            {(trip.itinerary || []).map((item) => (
              <p key={item.id}>
                {item.day}: {item.plan}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripDetails;