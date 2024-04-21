import { collection, addDoc, doc, deleteDoc, setDoc, serverTimestamp, query, where, getDoc, orderBy, onSnapshot } from "firebase/firestore";
import { database } from "./firebaseSetup";

// Add a new habit to the database
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

// Delete a habit from the database
export async function deleteHabit(userId, habitId) {
    try {
        await deleteDoc(doc(database, `Users/${userId}/Habits/${habitId}`));
    } catch (error) {
        console.error("Error deleting habit: ", error);
    }
}

// Update a habit in the database
export async function updateHabit(userId, habitId, data) {
    try {
        await setDoc(doc(database, `Users/${userId}/Habits/${habitId}`), data, { merge: true });
    } catch (error) {
        console.error("Error updating habit: ", error);
    }
}

// Add a new check-in to the database
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

// Get user profile from the database
export async function getUserProfileFromDB(uid) {
    try {
        const docRef = doc(database, `Users/${uid}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
}

// delete check-in from the database
export async function deleteCheckIn(checkInId) {
    try {
        await deleteDoc(doc(database, `CheckIns/${checkInId}`));
        console.log("Check-in deleted successfully", checkInId);
    } catch (error) {
        console.error("Error deleting check-in: ", error);
    }
}

// subscribe check-ins by userId
export function subscribeCheckInsByUserId(userId, callback) {
    const q = query(collection(database, "CheckIns"), where("userId", "==", userId), where('taskCompleted', '==', true));
    return onSnapshot(q, (snapshot) => {
        const checkIns = [];
        snapshot.forEach((doc) => {
            checkIns.push({ id: doc.id, ...doc.data() });
        });
        callback(checkIns);
    });
}

// Get habits by userId, only return the habits that have progress < 100 and endDate > today
// To fix the firebase error, please add an index in firebase
export function subscribeHabitsByUserId(userId, callback) {
    const q = query(collection(database, `Users/${userId}/Habits`),
        where('progress', '<', 100),
        where('endDate', '>', new Date())
    );
    return onSnapshot(q, (snapshot) => {
        const habits = [];
        snapshot.forEach((doc) => {
            habits.push({ id: doc.id, ...doc.data() });
        });
        callback(habits);
    });
}

// Get check-ins by userId and habitId, only return the check-ins that have taskCompleted = true
export function subscribeCheckInsByUserIdAndHabitId(userId, habitId, callback) {
    const q = query(collection(database, "CheckIns"),
        where("userId", "==", userId),
        where("habitId", "==", habitId),
        where('taskCompleted', '==', true));
    return onSnapshot(q, (snapshot) => {
        const checkIns = [];
        snapshot.forEach((doc) => {
            checkIns.push({ id: doc.id, ...doc.data() });
        });
        callback(checkIns);
    });
}

// add user to database
export async function addUserToDB(userId, data) {
    try {
        await setDoc(doc(database, `Users/${userId}`), data);
    } catch (error) {
        console.error("Error adding user: ", error);
    }
}

//subscribe due habits by userId
export function subscribeDueHabitsByUserId(userId, callback) {
    // Get the start and end of today's date (midnight and one second before midnight)
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const q = query(
        collection(database, `Users/${userId}/Habits`),
        where('endDate', '>=', startOfToday),
        where('endDate', '<=', endOfToday),
        where('progress', '<', 100),
    );
    return onSnapshot(q, (snapshot) => {
        const habits = [];
        snapshot.forEach((doc) => {
            habits.push({ id: doc.id, ...doc.data() });
        });
        callback(habits);
    });
}

// subscribe completed habits by userId
export function subscribeCompletedHabitsByUserId(userId, callback) {
    const q = query(
        collection(database, `Users/${userId}/Habits`),
        where('status', '==', 'completed'),
    );
    return onSnapshot(q, (snapshot) => {
        const habits = [];
        snapshot.forEach((doc) => {
            habits.push({ id: doc.id, ...doc.data() });
        });
        callback(habits);
    });
}

// subscribe failed habits by userId
export function subscribeFailedHabitsByUserId(userId, callback) {
    const q = query(
        collection(database, `Users/${userId}/Habits`),
        where('status', '==', 'failed'),
    );
    return onSnapshot(q, (snapshot) => {
        const habits = [];
        snapshot.forEach((doc) => {
            habits.push({ id: doc.id, ...doc.data() });
        });
        callback(habits);
    });
}

// update user data
export async function updateUserData(userId, data) {
    try {
        await setDoc(doc(database, `Users/${userId}`), data, { merge: true });
    } catch (error) {
        console.error("Error updating user pet status: ", error);
    }
}

// fetch user check-in data used in track screen
export function fetchUserCheckInTrack(userId, callback) {
    const q = query(collection(database, "CheckIns"),
        where("userId", "==", userId),
        where("isPublic", "==", true),
    );

    return onSnapshot(q, (querySnapshot) => {
        const fetchedLocations = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.location && data.diary) {
                fetchedLocations.push({
                    ...data.location,
                    diary: data.diary,
                    id: doc.id,
                });
            }
        });
        callback(fetchedLocations);
    });
}

// fetch public check-ins
export function fetchPublicCheckIns(callback) {
    const q = query(
        collection(database, "CheckIns"),
        where("isPublic", "==", true),
        orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (querySnapshot) => {
        const fetchedDiaries = [];
        querySnapshot.forEach((doc) => {
            fetchedDiaries.push({ id: doc.id, ...doc.data() });
        });
        callback(fetchedDiaries);
    });
}

// fetch all my diaries
export function fetchMyDiaries(userId, callback) {
    const q = query(
        collection(database, "CheckIns"),
        where("userId", "==", userId),
        where("isPublic", "!=", null),
        orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (querySnapshot) => {
        const fetchedMyDiaries = [];
        querySnapshot.forEach((doc) => {
            fetchedMyDiaries.push({ id: doc.id, ...doc.data() });
        });
        callback(fetchedMyDiaries);
    });
}