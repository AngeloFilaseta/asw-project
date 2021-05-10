import { Button, Collapse } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { useState } from "react";

export default function ReportEntry(props) {

    const [open, setOpen] = useState(false);

    return (
        <>
            <Button block size="lg" variant="success"
                style={{ fontWeight: "bold" }}
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}>
                Show {props.username}'s report
        </Button>
            <Collapse in={open}>
                <div className="border border-info rounded" align="center">
                    {alternateListsElements(props.sentences, props.draws)
                        .map((entry, index) => renderContent(entry, index))}
                </div>
            </Collapse>
        </>
    )

    function alternateListsElements(sentence, draw) {
        let run = 0, first = 0, second = 0;
        const newArr = [];
        while (run < sentence.length + draw.length) {
            if (first > second) {
                newArr[run] = draw[second];
                second++;
            } else {
                newArr[run] = sentence[first];
                first++;
            }
            run++;
        }
        return newArr;
    }

    function renderContent(entry, index) {
        if (index % 2 === 0) {
            return <h2 key={"entry " + index}>"{entry}"</h2>
        } else {
            return <SVG src={entry} key={"entry " + index} />
        }
    }

}
