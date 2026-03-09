function PlayerRow({ player, index }){
    const isMe = player.name === "Te (Saját)"

    return(
        <tr style={{ borderBottom: "1px solid #e5e7eb", background: isMe ? "#e0e7ff" : "transparent" }}>
            <td style={{ padding: "var(--space-3)", fontWeight: "bold", color: "var(--color-primary)" }}>
                #{index}
            </td>
            <td style={{ padding: "var(--space-3)", fontWeight: isMe ? "bold" : "normal" }}>
                {player.name}
            </td>
            <td style={{ padding: "var(--space-3)", fontWeight: "bold" }}>
                {player.score} ms
            </td>
        </tr>
    )
}

export default PlayerRow