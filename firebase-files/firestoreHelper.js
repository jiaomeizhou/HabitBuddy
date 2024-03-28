import { collection, addDoc, doc, deleteDoc, setDoc, serverTimestamp, query, where } from "firebase/firestore";
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

export async function fetchTodayCheckIn(userId, habitId) {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const checkInsRef = collection(database, "CheckIns");
    const q = query(checkInsRef,
        where("userId", "==", userId),
        where("habitId", "==", habitId),
        where("createdAt", ">=", startDate),
        where("createdAt", "<", endDate)
    );

    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return { id: doc.id, ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error("Error fetching today's check-in: ", error);
        throw error;
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
