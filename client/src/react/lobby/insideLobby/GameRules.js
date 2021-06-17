import Card from "react-bootstrap/Card"

export default function GameRules() {
    return (
        <Card className="m-3 m-md-0" style={{background:"rgba(255,255,255, 0)", border:"none"}}>
            <Card.Header className="font-weight-bold" style={{border:"none",background:"rgba(255,255,255, 0)"}} align="center">Before the Game starts:</Card.Header>
            <Card.Body style={{background:"rgba(255,255,255, 1)", borderRadius:"6px"}}>
                <Card.Title><h1>Rules of the game</h1></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">How to play:</Card.Subtitle>
                <Card.Text style={{ fontSize: 20}}>
                    Each player has a virtual sheet, on each turn every player has to write
                    a random sentence in the first phase and then the sentence is passed to
                    the next player, who has to draw the same sentence. In the final phase the
                    drawing is passed to another player: this time he'll try to reconstruct
                    the first sentence by analizyng the drawing. It's not a competitive game, so
                    enjoy the misunderstanding of every user and check if someone recreated the
                    original sentence only looking at the previous playerdrawing. Have fun!
                </Card.Text>
                <div align="center">
                    <Card.Link href="https://it.wikipedia.org/wiki/Sigaretta_(gioco)">Sigaretta, the original game</Card.Link>
                </div>
            </Card.Body>
        </Card>
    )
}