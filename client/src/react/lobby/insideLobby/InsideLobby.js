import GameRules from "./GameRules"
import Controls from "./Controls"

export default function InsideLobby() {
    return (
        <>
            <GameRules />
            <div align="center">
                <Controls />
            </div>
        </>
    )
}