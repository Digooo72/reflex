import Card from "../components/Card"

function HomePage(){

    return(
        <>
            {/* Ez a div felel az animált lila ködért, és csak a Főoldalon létezik */}
            <div className="home-ambient-bg"></div>

            <section style={{ position: "relative", zIndex: 1 }}>
                <h1 style={{
                    textAlign: "center",
                    marginBottom: "var(--space-5)",
                    color: "var(--color-text)",
                    textShadow: "0 0 20px rgba(139, 92, 246, 0.5)" // Finom lila ragyogás a címnek is
                }}>
                    Üdvözöl a Reflex Teszt Játék!
                </h1>

                <div className="grid">
                    <Card title="🎮 Játék" to="/game">
                        Tedd próbára a reflexeidet! Kattints a zöld célpontra amilyen gyorsan csak tudsz.
                    </Card>

                    <Card title="🏆 Ranglista" to="/leaderboard">
                        Nézd meg a globális toplistát és hasonlítsd össze az idődet a többiekkel.
                    </Card>

                    <Card title="📊 Statisztika" to="/profile">
                        Lépj be a profilodba, és kövesd nyomon a korábbi eredményeidet, fejlődésedet.
                    </Card>
                </div>
            </section>
        </>
    )

}

export default HomePage