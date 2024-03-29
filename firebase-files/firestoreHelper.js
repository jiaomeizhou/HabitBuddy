import { collection, addDoc, doc, deleteDoc, setDoc, serverTimestamp, query, where, getDocs, onSnapshot} from "firebase/firestore";
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

export async function getAllDocs(path) {
    try {
        const querySnapshot = await getDocs(collection(database, path));
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        return data;
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
}

export async function deleteCheckIn(checkInId) {
    try {
        await deleteDoc(doc(database, `CheckIns/${checkInId}`));
        console.log("Check-in deleted successfully", checkInId);
    } catch (error) {
        console.error("Error deleting check-in: ", error);
    }
}

export function subscribeCheckInsByUserId(userId, callback) {
    const q = query(collection(database, "CheckIns"), where("userId", "==", userId));
    return onSnapshot(q, (snapshot) => {
        const checkIns = [];
        snapshot.forEach((doc) => {
            checkIns.push({ id: doc.id, ...doc.data() });
        });
        callback(checkIns);
    });
}

export function subscribeHabitsByUserId(userId, callback) {
    const q = query(collection(database, `Users/${userId}/Habits`));
    return onSnapshot(q, (snapshot) => {
        const habits = [];
        snapshot.forEach((doc) => {
            habits.push({ id: doc.id, ...doc.data() });
        });
        callback(habits);
    });
}
