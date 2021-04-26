import { useSelector } from "react-redux"

import Form from "react-bootstrap/Form"

import { DEFAULT_LANGUAGE } from "../../util/global"

export default function LanguageForm(props){
    return(
        <Form.Control size="lg" as="select" onChange={props.onChange} >
            {getLanguages(useSelector(state => state.util.languages))}
        </Form.Control>)
}

function getLanguages(languageList){
    return (
        <>
            {languageList.map(item => (
                item !== DEFAULT_LANGUAGE ?
                    <option key={item}>{item}</option> :
                    <option key={item} selected>{item}</option>
            ))}
        </>
    )
} 