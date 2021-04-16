import { useSelector } from "react-redux"

import Form from "react-bootstrap/Form"

import { DEFAULT_LANGUAGE } from "../../util/global"

export default function LanguageForm(props){
    return(
        <Form.Control size="lg" as="select" onChange={props.onChange} >
            {getLanguages(useSelector(state => state.util.languages))}
        </Form.Control>
    )
}

function getLanguages(languageList){
    return (
        <>
            {languageList.map(listitem => (
                listitem !== DEFAULT_LANGUAGE ? 
                    <option key={listitem}>{listitem}</option> : 
                    <option key={listitem} selected>{listitem}</option>
            ))}
        </>
    )
} 