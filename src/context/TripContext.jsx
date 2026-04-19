import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createTrip,
  getTrips,
  deleteTrip,
  getTripById,
  updateTrip,
} from "../services/tripService";

export const TripContext = createContext();

function TripProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [trips, setTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(false);

  const fetchTrips = useCallback(async () => {
    if (!user) {
      setTrips([]);
      return;
    }

    setLoadingTrips(true);
    try {
      const data = await getTrips(user.uid);
      setTrips(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoadingTrips(false);
    }
  }, [user]);

  const addTrip = async (tripData) => {
    if (!user) return;
    await createTrip(user.uid, tripData);
    fetchTrips();
  };

  const removeTrip = async (tripId) => {
    if (!user) return;
    await deleteTrip(user.uid, tripId);
    fetchTrips();
  };

  const fetchTripById = async (tripId) => {
    if (!user) return null;
    return await getTripById(user.uid, tripId);
  };

  const editTrip = async (tripId, updatedData) => {
    if (!user) return;
    await updateTrip(user.uid, tripId, updatedData);
    fetchTrips();
  };

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  return (
    <TripContext.Provider
      value={{
        trips,
        loadingTrips,
        fetchTrips,
        addTrip,
        removeTrip,
        fetchTripById,
        editTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export default TripProvider;