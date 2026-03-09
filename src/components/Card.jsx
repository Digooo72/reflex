import { Link } from "react-router-dom"

function Card({ title, children, to }) {
    // Közös stílus a kártyáknak
    const cardStyle = {
        background: "white",
        padding: "var(--space-4)",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow)",
        display: "block",
        textDecoration: "none",
        color: "var(--color-text)",
        transition: "transform 0.2s, box-shadow 0.2s",
        height: "100%"
    }

    // Ha van "to" paraméter, akkor navigációs linkként rendereljük
    if (to) {
        return (
            <Link
                to={to}
                style={cardStyle}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow)';
                }}
            >
                <h2 style={{ color: "var(--color-primary)", marginBottom: "var(--space-2)" }}>{title}</h2>
                <p>{children}</p>
            </Link>
        )
    }

    // Ha nincs "to", akkor marad egy sima statikus elem
    return (
        <article style={cardStyle}>
            <h2 style={{ color: "var(--color-primary)", marginBottom: "var(--space-2)" }}>{title}</h2>
            <p>{children}</p>
        </article>
    )
}

export default Card