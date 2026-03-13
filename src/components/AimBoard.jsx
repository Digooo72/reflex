import { useState, useEffect } from "react";
import { saveAimScore } from "../services/scoreServices"; // <-- ÚJ IMPORT

function AimBoard() {
    const [gameState, setGameState] = useState("idle"); // idle, playing, finished
    const [targetPos, setTargetPos] = useState({ top: "50%", left: "50%" });
    const [hits, setHits] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [reactionTimes, setReactionTimes] = useState([]);
    const TOTAL_TARGETS = 10;

    // Görgetés letiltása a játék alatt (mint a másik játéknál)
    useEffect(() => {
        document.body.classList.add("no-scroll");
        return () => document.body.classList.remove("no-scroll");
    }, []);

    const startGame = () => {
        setGameState("playing");
        setHits(0);
        setReactionTimes([]);
        moveTarget();
        setStartTime(Date.now());
    };

    const moveTarget = () => {
        // Véletlenszerű pozíció 10% és 90% között, hogy ne lógjon le a képernyőről
        const top = Math.floor(Math.random() * 80) + 10;
        const left = Math.floor(Math.random() * 80) + 10;
        setTargetPos({ top: `${top}%`, left: `${left}%` });
    };

    const handleHit = async () => {
        if (gameState !== "playing") return;

        const now = Date.now();
        const timeTaken = now - startTime;
        const newReactionTimes = [...reactionTimes, timeTaken];
        setReactionTimes(newReactionTimes);

        const newHits = hits + 1;
        setHits(newHits);

        if (newHits >= TOTAL_TARGETS) {
            setGameState("finished");

            // --- FIREBASE MENTÉS ---
            const finalAvg = Math.round(newReactionTimes.reduce((a, b) => a + b, 0) / newReactionTimes.length);
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            if (currentUser && currentUser.username) {
                try {
                    await saveAimScore(currentUser.username, finalAvg);
                    console.log("Céllövölde eredmény mentve!");
                } catch (e) {
                    console.error("Nem sikerült menteni a céllövöldét:", e);
                }
            }

        } else {
            setStartTime(now);
            moveTarget();
        }
    };

    // Átlag kiszámítása
    const avgTime = reactionTimes.length > 0
        ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
        : 0;

    return (
        <div style={{
            position: "relative", width: "100%", height: "60vh", minHeight: "400px",
            background: "rgba(0,0,0,0.2)", borderRadius: "var(--radius)",
            overflow: "hidden", border: "1px solid var(--color-border)",
            boxShadow: "inset 0 0 30px rgba(0,0,0,0.5)"
        }}>

            {/* Fejléc */}
            <div style={{ padding: "10px 20px", display: "flex", justifyContent: "space-between", background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
                <span style={{ color: "var(--color-text-muted)", fontWeight: "bold" }}>Célpontok: <span style={{color: "var(--color-primary)"}}>{hits} / {TOTAL_TARGETS}</span></span>
                {gameState === "playing" && <span style={{ color: "var(--color-text-muted)" }}>Lődd ki mindet!</span>}
            </div>

            {/* Kezdőképernyő */}
            {gameState === "idle" && (
                <div style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "20px" }}>
                    <h2 style={{ color: "var(--color-primary)" }}>🎯 Céllövölde</h2>
                    <p style={{ color: "var(--color-text-muted)" }}>Kattints a megjelenő célpontokra minél gyorsabban!</p>
                    <button onClick={startGame}>START</button>
                </div>
            )}

            {/* A Játék (Célpont) */}
            {gameState === "playing" && (
                <div
                    onClick={handleHit}
                    style={{
                        position: "absolute",
                        top: targetPos.top,
                        left: targetPos.left,
                        transform: "translate(-50%, -50%)",
                        width: "60px",
                        height: "60px",
                        // Látványos céltábla dizájn CSS-ből:
                        background: "radial-gradient(circle, var(--color-accent) 20%, white 25%, var(--color-bg) 30%, white 45%, var(--color-accent) 50%, transparent 60%)",
                        borderRadius: "50%",
                        cursor: "crosshair",
                        boxShadow: "var(--glow-accent)",
                        transition: "top 0.1s, left 0.1s" // Pici átmenet, ha ugrik
                    }}
                />
            )}

            {/* Eredmény */}
            {gameState === "finished" && (
                <div style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "20px" }}>
                    <h2 style={{ color: "var(--color-secondary)", textShadow: "var(--glow-secondary)" }}>Kész!</h2>
                    <p style={{ color: "var(--color-text-muted)" }}>Átlagos reakcióidő célpontonként:</p>
                    <h3 style={{ color: "var(--color-primary)", fontSize: "3rem", margin: "10px 0" }}>{avgTime} ms</h3>
                    <button onClick={startGame}>Újra</button>
                </div>
            )}
        </div>
    )
}

export default AimBoard;