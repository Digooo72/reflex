import LeaderboardTable from "../components/LeaderboardTable"

function LeaderboardPage() {
    return (
        <>
            {/* Animált lila-cián háttér */}
            <div className="home-ambient-bg"></div>

            <section style={{ position: "relative", zIndex: 1 }}>
                <h1 style={{ color: "var(--color-text)", textShadow: "var(--glow-primary)" }}>Globális Ranglista</h1>
                <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-4)" }}>Nézd meg a legjobb reakcióidőket!</p>

                <LeaderboardTable />
            </section>
        </>
    )
}

export default LeaderboardPage