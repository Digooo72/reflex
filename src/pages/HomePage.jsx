import Card from "../components/Card"

function HomePage(){

    return(
        <section>
            <h1 style={{ textAlign: "center", marginBottom: "var(--space-5)" }}>
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
    )

}

export default HomePage