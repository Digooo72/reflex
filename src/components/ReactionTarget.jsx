function ReactionTarget({ state, onClick }) {
    let text = "Kattints a kezdéshez!"
    let bgColor = "var(--color-primary)" // Kék (alap)
    let fontSize = "var(--font-xl)"

    if (state === "waiting") {
        text = "Várj..."
        bgColor = "var(--color-accent)" // Piros
    }
    else if (state === "ready") {
        text = "KATTINTS!"
        bgColor = "var(--color-secondary)" // Zöld
    }
    else if (state === "finished") {
        text = "Kész! Kattints az újraindításhoz."
        bgColor = "var(--color-primary)" // Kék
        fontSize = "var(--font-md)" // Kisebb betű, hogy kiférjen a szöveg
    }
    else if (state === "early") {
        text = "Túl korai! Kattints az újraindításhoz."
        bgColor = "#f59e0b" // Narancssárga figyelmeztetés
        fontSize = "var(--font-md)"
    }

    return (
        <button
            onClick={onClick}
            aria-label="reaction target"
            style={{
                width: "min(300px, 80vw)",
                height: "min(300px, 80vw)",
                borderRadius: "50%",
                fontSize: fontSize,
                fontWeight: "bold",
                backgroundColor: bgColor,
                color: "white",
                border: "none",
                cursor: "pointer",
                boxShadow: "var(--shadow)",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "var(--space-3)",
                transition: "background-color 0.1s ease-out, transform 0.05s", // Gyorsabb pattanás effektus
            }}
            // Gombnyomás (kattanás) vizuális effektusa
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            {text}
        </button>
    )
}

export default ReactionTarget