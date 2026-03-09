function LoginPage() {
    return (
        <>
            {/* Animált lila-cián háttér */}
            <div className="home-ambient-bg"></div>

            <section style={{
                maxWidth: '400px',
                margin: 'auto',
                position: 'relative',
                zIndex: 1,
                background: 'var(--color-surface)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: 'var(--shadow)'
            }}>
                <h1 style={{ textAlign: 'center', color: 'var(--color-primary)', textShadow: 'var(--glow-primary)', marginBottom: 'var(--space-4)' }}>Belépés</h1>

                <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <input type="email" placeholder="E-mail cím" />
                    <input type="password" placeholder="Jelszó" />
                    <button type="button" style={{ marginTop: 'var(--space-2)' }}>Bejelentkezés</button>
                </form>

                <p style={{ marginTop: 'var(--space-4)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    Nincs még fiókod? <a href="/register" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 'bold' }}>Regisztrálj!</a>
                </p>
            </section>
        </>
    )
}

export default LoginPage