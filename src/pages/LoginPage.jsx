function LoginPage() {
    return (
        <section style={{ maxWidth: '400px', margin: 'auto' }}>
            <h1>Belépés</h1>
            <form className="grid" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <input type="email" placeholder="E-mail cím" style={{ padding: 'var(--space-2)' }} />
                <input type="password" placeholder="Jelszó" style={{ padding: 'var(--space-2)' }} />
                <button type="button">Bejelentkezés</button>
            </form>
            <p style={{ marginTop: 'var(--space-3)' }}>
                Nincs még fiókod? <a href="/register">Regisztrálj!</a>
            </p>
        </section>
    )
}

export default LoginPage