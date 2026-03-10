import { useState, useEffect } from "react"
import { NavLink, Link, useLocation } from "react-router-dom"

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Automatikusan bezárja a burger menüt, ha oldalt váltasz
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const links = [
        { name: 'Főoldal', path: '/' },
        { name: 'Játék', path: '/game' },
        { name: 'Ranglista', path: '/leaderboard' },
        { name: 'Profil', path: '/profile' },
        { name: 'Belépés', path: '/login' }
    ];

    return (
        <header style={{
            background: "rgba(11, 15, 25, 0.8)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            position: "sticky",
            top: 0,
            zIndex: 50 // Magas z-index, hogy a lenyíló menü minden felett legyen
        }}>
            <nav style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "var(--space-3) var(--space-4)",
                maxWidth: "1200px",
                margin: "0 auto",
                position: "relative" // Ez kell ahhoz, hogy a mobil menü pontosan alulról nyíljon le
            }}>
                <Link to="/" style={{ textDecoration: "none", fontWeight: "900", fontSize: "var(--font-lg)", color: "var(--color-text)", letterSpacing: "1px" }}>
                    <span style={{ color: "var(--color-primary)", textShadow: "var(--glow-primary)" }}>⚡</span> Reflex<span style={{color: "var(--color-primary)"}}>Pro</span>
                </Link>

                {/* --- MOBIL HAMBURGER GOMB --- */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Menü megnyitása"
                >
                    {isMenuOpen ? "✖" : "☰"}
                </button>

                {/* --- ASZTALI MENÜ (Mobilon rejtett) --- */}
                <div className="desktop-menu">
                    {links.map((link) => (
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

                {/* --- MOBIL LENYÍLÓ MENÜ (Asztalon rejtett) --- */}
                <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
                    {links.map((link) => (
                        <NavLink key={link.name} to={link.path} style={({isActive}) => ({
                            textDecoration: "none",
                            padding: "12px 16px",
                            borderRadius: "var(--radius)",
                            fontWeight: 600,
                            fontSize: "var(--font-md)",
                            textAlign: "center", // Középre igazítjuk mobilon, hogy szebb legyen
                            color: isActive ? "var(--color-bg)" : "var(--color-text)",
                            background: isActive ? "var(--color-primary)" : "rgba(255,255,255,0.05)",
                            boxShadow: isActive ? "var(--glow-primary)" : "none",
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