import { useState, useEffect } from "react"
import Card from "../components/Card"

function ProfilePage() {
    const [stats, setStats] = useState({ best: "-", count: 0 })

    useEffect(() => {
        // Betöltjük a mentett játékokat
        const localScores = JSON.parse(localStorage.getItem("reflexScores") || "[]")

        if (localScores.length > 0) {
            // Megkeressük a legkisebb időt (legjobb eredmény)
            const bestTime = Math.min(...localScores.map(s => s.score))
            setStats({ best: bestTime, count: localScores.length })
        }
    }, [])

    return (
        <section>
            <h1>Saját Profilom</h1>
            <div className="grid">
                <Card title="Személyes Legjobb">
                    <p style={{ fontSize: 'var(--font-xl)', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                        {stats.best} {stats.best !== "-" && "ms"}
                    </p>
                </Card>
                <Card title="Lejátszott játékok">
                    <p style={{ fontSize: 'var(--font-xl)', fontWeight: 'bold' }}>
                        {stats.count} <span style={{ fontSize: 'var(--font-md)', fontWeight: 'normal' }}>alkalom</span>
                    </p>
                </Card>
            </div>
        </section>
    )
}

export default ProfilePage