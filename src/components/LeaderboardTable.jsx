import { useState, useEffect } from "react"
import PlayerRow from "./PlayerRow"

function LeaderboardTable(){
    const [players, setPlayers] = useState([])

    useEffect(() => {
        const defaultPlayers = [
            { name: "Anna", score: 210 },
            { name: "Béla", score: 245 },
            { name: "Gábor", score: 280 }
        ]

        const localScores = JSON.parse(localStorage.getItem("reflexScores") || "[]")
        const allScores = [...defaultPlayers, ...localScores].sort((a, b) => a.score - b.score)

        setPlayers(allScores.slice(0, 10))
    }, [])

    return(
        <table style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
            marginTop: "var(--space-4)",
            background: "var(--color-surface)", // Sötét üveghatás
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "var(--shadow)",
            borderRadius: "var(--radius)",
            overflow: "hidden"
        }}>
            <thead style={{ background: "rgba(0, 229, 255, 0.1)", borderBottom: "1px solid rgba(0, 229, 255, 0.3)" }}>
            <tr>
                <th style={{ padding: "var(--space-3)", color: "var(--color-primary)" }}>Helyezés</th>
                <th style={{ padding: "var(--space-3)", color: "var(--color-primary)" }}>Játékos</th>
                <th style={{ padding: "var(--space-3)", color: "var(--color-primary)" }}>Pont (ms)</th>
            </tr>
            </thead>
            <tbody>
            {players.map((p, index) => (
                <PlayerRow key={index} player={p} index={index + 1} />
            ))}
            </tbody>
        </table>
    )
}

export default LeaderboardTable