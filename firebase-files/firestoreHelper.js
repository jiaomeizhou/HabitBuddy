import { collection, addDoc, doc, deleteDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function addHabit(userId, data) {
    try {
        await addDoc(collection(database, `Users/${userId}/Habits`), {
            ...data,
            createdAt: serverTimestamp()
        });
        console.log("Habit added successfully", data);
    } catch (error) {
        console.error("Error adding habit: ", error);
    }
}

export async function deleteHabit(userId, habitId) {
    try {
        await deleteDoc(doc(database, `Users/${userId}/Habits/${habitId}`));
    } catch (error) {
        console.error("Error deleting habit: ", error);
    }
}

export async function updateHabit(userId, habitId, data) {
    try {
        await setDoc(doc(database, `Users/${userId}/Habits/${habitId}`), data, { merge: true });
    } catch (error) {
        console.error("Error updating habit: ", error);
    }
}

export async function addCheckIn(data) {
    try {
        await addDoc(collection(database, "CheckIns"), {
            ...data,
            createdAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Error adding check-in: ", error);
    }
}