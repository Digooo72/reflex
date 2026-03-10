import { db } from "../firebase";
import { collection, addDoc, getDocs, query, orderBy, limit, where, deleteDoc, doc, updateDoc} from "firebase/firestore";
// A Firestore kollekció (tábla) neve, ide mentjük a játékokat
const SCORES_COLLECTION = "game_sessions";

// 1. Eredmény mentése a felhőbe (CREATE)
export async function saveScore(playerName, scoreMs) {
    try {
        const docRef = await addDoc(collection(db, SCORES_COLLECTION), {
            name: playerName,
            score: scoreMs,
            played_at: new Date().toISOString()
        });
        return docRef.id;
    } catch (error) {
        console.error("Hiba az eredmény mentésekor: ", error);
        throw error;
    }
}

// 2. Toplista lekérése a felhőből (READ)
export async function getTopScores(limitCount = 10) {
    try {
        // Lekérjük a legjobb (legkisebb ms) időket növekvő sorrendben
        const q = query(
            collection(db, SCORES_COLLECTION),
            orderBy("score", "asc"),
            limit(limitCount)
        );

        const querySnapshot = await getDocs(q);
        const scores = [];

        querySnapshot.forEach((doc) => {
            scores.push({ id: doc.id, ...doc.data() });
        });

        return scores;
    } catch (error) {
        console.error("Hiba a toplista lekérésekor: ", error);
        return [];
    }
}

// 3. Egy adott játékos összes eredményének lekérése (READ)
export async function getUserScores(playerName) {
    try {
        const q = query(
            collection(db, SCORES_COLLECTION),
            where("name", "==", playerName),
            orderBy("score", "asc") // Legjobb idők elöl
        );

        const querySnapshot = await getDocs(q);
        const scores = [];
        querySnapshot.forEach((document) => {
            scores.push({ id: document.id, ...document.data() });
        });
        return scores;
    } catch (error) {
        console.error("Hiba a saját adatok lekérésekor: ", error);
        return [];
    }
}

// 4. Egy adott eredmény törlése az adatbázisból (DELETE)
export async function deleteScore(scoreId) {
    try {
        await deleteDoc(doc(db, SCORES_COLLECTION, scoreId));
    } catch (error) {
        console.error("Hiba a törlés során: ", error);
        throw error;
    }
}

// 5. Eredmény módosítása (UPDATE) - pl. megjegyzés hozzáadása
export async function updateScoreNote(scoreId, newNote) {
    try {
        const scoreRef = doc(db, SCORES_COLLECTION, scoreId);
        await updateDoc(scoreRef, { note: newNote });
    } catch (error) {
        console.error("Hiba a módosításkor: ", error);
        throw error;
    }
}