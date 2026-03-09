import { useState, useEffect } from "react"
import Card from "../components/Card"

function ProfilePage() {
    const [stats, setStats] = useState({ best: "-", count: 0, average: "-" })

    useEffect(() => {
        const localScores = JSON.parse(localStorage.getItem("reflexScores") || "[]")

        if (localScores.length > 0) {
            const bestTime = Math.min(...localScores.map(s => s.score))
            const sumTime = localScores.reduce((total, current) => total + current.score, 0)
            const avgTime = Math.round(sumTime / localScores.length)

            setStats({
                best: bestTime,
                count: localScores.length,
                average: avgTime
            })
        }
    }, [])

    return (
        <>
            {/* Animált lila-cián háttér */}
            <div className="home-ambient-bg"></div>

            <section style={{ position: "relative", zIndex: 1 }}>
                <h1 style={{ color: "var(--color-text)", textShadow: "var(--glow-primary)" }}>
                    Saját Profilom
                </h1>

                <div className="grid">
                    <Card title="Személyes Legjobb">
                        <p style={{ fontSize: 'var(--font-xl)', fontWeight: 'bold', color: 'var(--color-primary)', textShadow: 'var(--glow-primary)' }}>
                            {stats.best} {stats.best !== "-" && "ms"}
                        </p>
                    </Card>

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
        </>
    )
}

export default ProfilePage