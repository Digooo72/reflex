function RegisterPage() {
    return (
        <section style={{ maxWidth: '400px', margin: 'auto' }}>
            <h1>Regisztráció</h1>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <input type="text" placeholder="Felhasználónév" style={{ padding: 'var(--space-2)' }} />
                <input type="email" placeholder="E-mail cím" style={{ padding: 'var(--space-2)' }} />
                <input type="password" placeholder="Jelszó" style={{ padding: 'var(--space-2)' }} />
                <button type="button">Fiók létrehozása</button>
            </form>
        </section>
    )
}

export default RegisterPage