import { useState, useEffect } from "react"
import Card from "../components/Card"

function ProfilePage() {
    // Kiegészítjük az állapotot az 'average' (átlag) értékkel
    const [stats, setStats] = useState({ best: "-", count: 0, average: "-" })

    useEffect(() => {
        // Betöltjük a mentett játékokat a LocalStorage-ból
        const localScores = JSON.parse(localStorage.getItem("reflexScores") || "[]")

        if (localScores.length > 0) {
            // 1. Legjobb idő (A legkisebb érték kiválasztása)
            const bestTime = Math.min(...localScores.map(s => s.score))

            // 2. Átlagos idő kiszámítása
            // Összeadjuk az összes pontot a reduce() segítségével...
            const sumTime = localScores.reduce((total, current) => total + current.score, 0)
            // ...majd elosztjuk a darabszámmal, és kerekítjük, hogy szép egész szám legyen
            const avgTime = Math.round(sumTime / localScores.length)

            // Frissítjük a state-et az új adatokkal
            setStats({
                best: bestTime,
                count: localScores.length,
                average: avgTime
            })
        }
    }, [])

    return (
        <section>
            <h1 style={{ color: "var(--color-text)", textShadow: "var(--glow-primary)" }}>
                Saját Profilom
            </h1>

            <div className="grid">
                <Card title="Személyes Legjobb">
                    <p style={{ fontSize: 'var(--font-xl)', fontWeight: 'bold', color: 'var(--color-primary)', textShadow: 'var(--glow-primary)' }}>
                        {stats.best} {stats.best !== "-" && "ms"}
                    </p>
                </Card>

                {/* ÚJ KÁRTYA: Átlagos Reakcióidő */}
                <Card title="Átlagos Reakcióidő">
                    <p style={{ fontSize: 'var(--font-xl)', fontWeight: 'bold', color: 'var(--color-secondary)', textShadow: 'var(--glow-secondary)' }}>
                        {stats.average} {stats.average !== "-" && "ms"}
                    </p>
                </Card>

                <Card title="Lejátszott játékok">
                    <p style={{ fontSize: 'var(--font-xl)', fontWeight: 'bold', color: 'var(--color-text)' }}>
                        {stats.count} <span style={{ fontSize: 'var(--font-md)', fontWeight: 'normal', color: 'var(--color-text-muted)' }}>alkalom</span>
                    </p>
                </Card>
            </div>
        </section>
    )
}

export default ProfilePage