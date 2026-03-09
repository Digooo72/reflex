import { useState, useEffect } from "react"
import PlayerRow from "./PlayerRow"

function LeaderboardTable(){
    const [players, setPlayers] = useState([])

    useEffect(() => {
        // Néhány "bot" játékos, hogy sose legyen üres a lista
        const defaultPlayers = [
            { name: "Anna", score: 210 },
            { name: "Béla", score: 245 },
            { name: "Gábor", score: 280 }
        ]

        // Saját eredmények betöltése
        const localScores = JSON.parse(localStorage.getItem("reflexScores") || "[]")

        // Összegyúrjuk a sajátjainkat a botokkal, és sorba rendezzük (legkisebb idő a legjobb)
        const allScores = [...defaultPlayers, ...localScores].sort((a, b) => a.score - b.score)

        // Csak a Top 10-et jelenítjük meg
        setPlayers(allScores.slice(0, 10))
    }, [])

    return(
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", marginTop: "var(--space-4)", background: "white", boxShadow: "var(--shadow)", borderRadius: "var(--radius)", overflow: "hidden" }}>
            <thead style={{ background: "var(--color-primary)", color: "white" }}>
            <tr>
                <th style={{ padding: "var(--space-3)" }}>Helyezés</th>
                <th style={{ padding: "var(--space-3)" }}>Játékos</th>
                <th style={{ padding: "var(--space-3)" }}>Pont (ms)</th>
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