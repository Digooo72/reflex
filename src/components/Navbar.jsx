import { NavLink, Link } from "react-router-dom"

function Navbar() {
    return (
        <header style={{ background: "white", boxShadow: "var(--shadow)", position: "sticky", top: 0, zIndex: 10 }}>
            <nav style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "var(--space-3) var(--space-4)",
                maxWidth: "1200px",
                margin: "0 auto",
                flexWrap: "wrap",
                gap: "var(--space-3)"
            }}>
                {/* Íme a kattintható logó */}
                <Link to="/" style={{ textDecoration: "none", fontWeight: "bold", fontSize: "var(--font-lg)", color: "var(--color-primary)" }}>
                    ⚡ ReflexPro
                </Link>

                <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
                    <NavLink to="/" style={({isActive}) => ({ textDecoration: "none", padding: "8px 12px", borderRadius: "8px", fontWeight: 600, color: isActive ? "var(--color-primary)" : "var(--color-text)", background: isActive ? "#e0e7ff" : "transparent" })}>Főoldal</NavLink>
                    <NavLink to="/game" style={({isActive}) => ({ textDecoration: "none", padding: "8px 12px", borderRadius: "8px", fontWeight: 600, color: isActive ? "var(--color-primary)" : "var(--color-text)", background: isActive ? "#e0e7ff" : "transparent" })}>Játék</NavLink>
                    <NavLink to="/leaderboard" style={({isActive}) => ({ textDecoration: "none", padding: "8px 12px", borderRadius: "8px", fontWeight: 600, color: isActive ? "var(--color-primary)" : "var(--color-text)", background: isActive ? "#e0e7ff" : "transparent" })}>Ranglista</NavLink>
                    <NavLink to="/profile" style={({isActive}) => ({ textDecoration: "none", padding: "8px 12px", borderRadius: "8px", fontWeight: 600, color: isActive ? "var(--color-primary)" : "var(--color-text)", background: isActive ? "#e0e7ff" : "transparent" })}>Profil</NavLink>
                    <NavLink to="/login" style={({isActive}) => ({ textDecoration: "none", padding: "8px 12px", borderRadius: "8px", fontWeight: 600, color: isActive ? "var(--color-primary)" : "var(--color-text)", background: isActive ? "#e0e7ff" : "transparent" })}>Belépés</NavLink>
                </div>
            </nav>
        </header>
    )
}

export default Navbar