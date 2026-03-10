import { useState, useEffect } from "react"
import Card from "../components/Card"
import { getUserScores, deleteScore, updateScoreNote } from "../services/scoreServices"


function ProfilePage() {
    const [myScores, setMyScores] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // Aktuális felhasználó lekérése a memóriából
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    // Adatok betöltése a felhőből
    useEffect(() => {
        async function loadScores() {
            if (currentUser && currentUser.username) {
                setIsLoading(true);
                // Lekérjük CSAK ennek a játékosnak az eredményeit
                const scores = await getUserScores(currentUser.username);
                setMyScores(scores);
                setIsLoading(false);
            }
        }
        loadScores();
    }, [])

    // Törlés funkció (UX és CRUD követelmény)
    async function handleDelete(scoreId) {
        const isConfirmed = window.confirm("Biztosan törölni szeretnéd ezt az eredményt?");
        if (isConfirmed) {
            await deleteScore(scoreId);
            // Kiveszük a letörölt elemet a listából, így a képernyő (és a matek) azonnal frissül
            setMyScores(myScores.filter(score => score.id !== scoreId));
        }
    }

    // MÓDOSÍTÁS FUNKCIÓ (UPDATE)
    async function handleEdit(score) {
        const newNote = window.prompt("Írj egy megjegyzést ehhez a játékhoz (pl. 'Telefonról játszottam'):", score.note || "");
        if (newNote !== null) { // Ha nem a Mégse gombra nyomott
            await updateScoreNote(score.id, newNote);
            // Frissítjük a lokális listát, hogy azonnal látszódjon a változás
            setMyScores(myScores.map(s => s.id === score.id ? { ...s, note: newNote } : s));
        }
    }

    // Ha nincs bejelentkezve, hibaüzenet
    if (!currentUser) {
        return (
            <>
                <div className="home-ambient-bg"></div>
                <section style={{ position: "relative", zIndex: 1, textAlign: "center", marginTop: "var(--space-6)" }}>
                    <h2 style={{ color: "var(--color-accent)", marginBottom: "var(--space-3)" }}>Nincs jogosultságod!</h2>
                    <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-4)" }}>A statisztikák megtekintéséhez be kell jelentkezned.</p>
                    <a href="/login" style={{ background: "var(--color-primary)", color: "white", padding: "12px 24px", borderRadius: "var(--radius)", textDecoration: "none", fontWeight: "bold" }}>Tovább a Belépéshez</a>
                </section>
            </>
        )
    }

    // --- MATEK: STATISZTIKÁK KISZÁMÍTÁSA AZ ÉLŐ ADATOKBÓL ---

    // 1. Játszott meccsek
    const playCount = myScores.length;

    // 2. Legjobb idő (kiválasztjuk a legkisebb számot)
    const bestTime = playCount > 0 ? Math.min(...myScores.map(s => s.score)) : "-";

    // 3. Átlag (összeadjuk az összeset, és elosztjuk a darabszámmal)
    const sumTime = myScores.reduce((total, current) => total + current.score, 0);
    const avgTime = playCount > 0 ? Math.round(sumTime / playCount) : "-";

    return (
        <>
            <div className="home-ambient-bg"></div>

            <section style={{ position: "relative", zIndex: 1 }}>
                <h1 style={{ color: "var(--color-primary)", textShadow: "var(--glow-primary)" }}>
                    {currentUser.username} Profilja
                </h1>

                {isLoading ? (
                    <p style={{ color: "var(--color-primary)", textAlign: "center", padding: "var(--space-4)" }}>Adataid betöltése folyamatban... ⏳</p>
                ) : (
                    <>
                        {/* --- FELSŐ KÁRTYÁK A STATISZTIKÁKKAL --- */}
                        <div className="grid">
                            <Card title="Személyes Legjobb">
                                <p style={{ fontSize: 'var(--font-xl)', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                                    {bestTime} {bestTime !== "-" && "ms"}
                                </p>
                            </Card>
                            <Card title="Átlagos Reakcióidő">
                                <p style={{ fontSize: 'var(--font-xl)', fontWeight: 'bold', color: 'var(--color-secondary)' }}>
                                    {avgTime} {avgTime !== "-" && "ms"}
                                </p>
                            </Card>
                            <Card title="Lejátszott játékok">
                                <p style={{ fontSize: 'var(--font-xl)', fontWeight: 'bold', color: 'var(--color-text)' }}>
                                    {playCount} <span style={{ fontSize: 'var(--font-md)', fontWeight: 'normal', color: 'var(--color-text-muted)' }}>alkalom</span>
                                </p>
                            </Card>
                        </div>

                        {/* --- ALSÓ TÁBLÁZAT A JÁTÉKTÖRTÉNETTEL --- */}
                        <h2 style={{ marginTop: "var(--space-5)", color: "var(--color-text)" }}>Játéktörténet</h2>

                        {playCount === 0 ? (
                            <p style={{ color: "var(--color-text-muted)" }}>Még nincs mentett eredményed. Játssz egyet!</p>
                        ) : (
                            <table style={{
                                width: "100%", borderCollapse: "collapse", marginTop: "var(--space-3)",
                                background: "var(--color-surface)", borderRadius: "var(--radius)", overflow: "hidden"
                            }}>
                                <thead style={{ background: "rgba(255, 255, 255, 0.05)" }}>
                                <tr>
                                    <th style={{ padding: "12px", textAlign: "left", color: "var(--color-text)" }}>Dátum</th>
                                    <th style={{ padding: "12px", textAlign: "left", color: "var(--color-text)" }}>Eredmény</th>
                                    <th style={{ padding: "12px", textAlign: "right", color: "var(--color-text)" }}>Művelet</th>
                                </tr>
                                </thead>
                                <tbody>
                                {myScores.map((score) => (
                                    <tr key={score.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                                        <td style={{ padding: "12px", color: "var(--color-text-muted)" }}>
                                            {new Date(score.played_at).toLocaleDateString('hu-HU')} {new Date(score.played_at).toLocaleTimeString('hu-HU')}
                                            {/* Ide írjuk ki a megjegyzést, ha van */}
                                            {score.note && <div style={{ fontSize: "0.8rem", color: "var(--color-secondary)", marginTop: "4px" }}>💬 {score.note}</div>}
                                        </td>
                                        <td style={{ padding: "12px", color: "var(--color-primary)", fontWeight: "bold" }}>
                                            {score.score} ms
                                        </td>
                                        <td style={{ padding: "12px", textAlign: "right", display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                                            <button
                                                onClick={() => handleEdit(score)}
                                                style={{ background: "rgba(0, 229, 255, 0.2)", color: "var(--color-primary)", border: "1px solid var(--color-primary)", padding: "6px 12px", fontSize: "0.8rem", cursor: "pointer", borderRadius: "var(--radius)" }}
                                            >
                                                Szerkesztés
                                            </button>
                                            <button
                                                onClick={() => handleDelete(score.id)}
                                                style={{ background: "rgba(255, 0, 85, 0.2)", color: "#ff0055", border: "1px solid #ff0055", padding: "6px 12px", fontSize: "0.8rem", cursor: "pointer", borderRadius: "var(--radius)" }}
                                            >
                                                Törlés
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </>
                )}
            </section>
        </>
    )
}

export default ProfilePage