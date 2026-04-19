import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";

export const addTrip = async (tripData) => {
  return await addDoc(collection(db, "trips"), tripData);
};

export const getTrips = async (userId) => {
  const q = query(collection(db, "trips"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const deleteTrip = async (id) => {
  const tripDoc = doc(db, "trips", id);
  return await deleteDoc(tripDoc);
};