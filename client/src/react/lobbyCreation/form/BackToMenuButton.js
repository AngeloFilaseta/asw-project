import { useState } from "react"

import Button from "react-bootstrap/Button"
import { RedirectHome } from "../../common/GuessrRedirect"

export default function BackToMenuButton(){
    const [goBack, setGoBack] = useState(false)
    return goBack ? <RedirectHome /> : <Button block size="lg" variant="secondary" onClick={() => setGoBack(true)}>Back to menu</Button>
}