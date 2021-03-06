import { useState } from "react"
import { useSelector } from "react-redux"

import { RedirectTo } from "./GuessrRedirect"
import Button from "react-bootstrap/Button"

export default function BackButton(props) {

    const [goBack, setGoBack] = useState(false)

    let isLoading = useSelector(state => state.util.isLoading)

    if (isLoading) {
        return buttonIsLoading(props.buttonName)
    } else if (goBack) {
        return RedirectTo(props.destination)
    } else {
        return buttonLoaded(props.buttonName, () => setGoBack(true))
    }

}

function buttonIsLoading(buttonName) {
    return (
        <Button block variant="secondary" size="lg" disabled>
            {buttonName}
        </Button>
    )
}

function buttonLoaded(buttonName, setGoBack) {
    return (
        <Button block variant="primary" size="lg" onClick={setGoBack}>
            {buttonName}
        </Button>
    )
}