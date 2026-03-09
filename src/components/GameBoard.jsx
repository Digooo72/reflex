import { useState, useEffect } from "react"
import ReactionTarget from "./ReactionTarget"
import ScoreDisplay from "./ScoreDisplay"

function GameBoard() {
    // A játék lehetséges állapotai: "idle" (alap), "waiting" (piros), "ready" (zöld), "finished" (vége), "early" (túl korai)
    const [gameState, setGameState] = useState("idle")
    const [startTime, setStartTime] = useState(null)
    const [reactionTime, setReactionTime] = useState(null)
    const [timeoutId, setTimeoutId] = useState(null) // Erre azért van szükség, hogy leállítsuk az időzítőt, ha túl korán kattint

    function handleClick() {
        // 1. Ha alapállapotban van, vagy már vége egy körnek, indítsunk újat!
        if (gameState === "idle" || gameState === "finished" || gameState === "early") {
            setGameState("waiting")
            setReactionTime(null)

            const delay = Math.random() * 3000 + 1000 // 1-4 másodperc várakozás

            const id = setTimeout(() => {
                setGameState("ready")
                setStartTime(Date.now())
            }, delay)

            setTimeoutId(id)
        }
        // 2. Ha türelmetlen volt, és a piros alatt kattintott (Kiugrás)
        else if (gameState === "waiting") {
            clearTimeout(timeoutId) // Megállítjuk a zöldre váltást
            setGameState("early")
        }
        // 3. Ha zöld, mérjük az időt!
        else if (gameState === "ready") {
            const end = Date.now()
            const time = end - startTime
            setReactionTime(time)
            setGameState("finished")

            // Eredmény mentése a LocalStorage-ba
            const newScore = { name: "Te (Saját)", score: time }
            const existingScores = JSON.parse(localStorage.getItem("reflexScores") || "[]")
            existingScores.push(newScore)
            localStorage.setItem("reflexScores", JSON.stringify(existingScores))
        }
    }

    // Billentyűzet (Szóköz) támogatás
    useEffect(() => {
        function handleKey(e) {
            if (e.code === "Space") {
                e.preventDefault() // Megakadályozza az oldal görgetését
                handleClick()
            }
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [gameState, startTime, timeoutId]) // Frissítjük a függőségeket, hogy mindig a legújabb állapotot lássa

    return (
        <section style={{ textAlign: "center", marginTop: "var(--space-4)" }}>
            <ReactionTarget
                state={gameState}
                onClick={handleClick}
            />

            {/* Csak akkor mutatjuk az időt, ha van érvényes mérés */}
            {gameState === "finished" && <ScoreDisplay time={reactionTime} />}
        </section>
    )
}

export default GameBoard