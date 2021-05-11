import { useSelector } from "react-redux"

import Form from "react-bootstrap/Form"

import { DEFAULT_LANGUAGE } from "../../util/global"

export default function LanguageForm(props) {
    return (
        <Form.Control aria-label="selection" title="form selector" size="lg" as="select" onChange={props.onChange} defaultValue={DEFAULT_LANGUAGE}>
            {getLanguages(useSelector(state => state.util.languages))}
        </Form.Control>)
}

function getLanguages(languageList) {
    return languageList.map(item => <option key={item}>{item}</option>)
}