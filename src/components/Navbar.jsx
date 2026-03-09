import { NavLink, Link } from "react-router-dom"

function Navbar() {
    return (
        <header style={{
            background: "rgba(11, 15, 25, 0.8)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            position: "sticky",
            top: 0,
            zIndex: 10
        }}>
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
                <Link to="/" style={{ textDecoration: "none", fontWeight: "900", fontSize: "var(--font-lg)", color: "var(--color-text)", letterSpacing: "1px" }}>
                    <span style={{ color: "var(--color-primary)", textShadow: "var(--glow-primary)" }}>⚡</span> Reflex<span style={{color: "var(--color-primary)"}}>Pro</span>
                </Link>

                <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                    {/* Explicit útvonalak a helyes működéshez */}
                    {[
                        { name: 'Főoldal', path: '/' },
                        { name: 'Játék', path: '/game' },
                        { name: 'Ranglista', path: '/leaderboard' },
                        { name: 'Profil', path: '/profile' },
                        { name: 'Belépés', path: '/login' }
                    ].map((link) => (
                        <NavLink key={link.name} to={link.path} style={({isActive}) => ({
                            textDecoration: "none",
                            padding: "8px 16px",
                            borderRadius: "var(--radius)",
                            fontWeight: 600,
                            fontSize: "var(--font-sm)",
                            color: isActive ? "var(--color-bg)" : "var(--color-text-muted)",
                            background: isActive ? "var(--color-primary)" : "transparent",
                            boxShadow: isActive ? "var(--glow-primary)" : "none",
                            transition: "all 0.2s"
                        })}>
                            {link.name}
                        </NavLink>
                    ))}
                </div>
            </nav>
        </header>
    )
}

export default Navbar