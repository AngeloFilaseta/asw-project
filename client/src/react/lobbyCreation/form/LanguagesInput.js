import { useDispatch } from "react-redux"

import LanguageForm from "../../common/LanguageForm"
import { setLanguage } from "../../../redux/lobby/actions"

export default function LanguagesInput(){

    const dispatch = useDispatch()

    return(
        <>
            <h3>Select Language:</h3>
            <LanguageForm onChange={e => dispatch(setLanguage(e.target.value))} />
        </>
    )

}