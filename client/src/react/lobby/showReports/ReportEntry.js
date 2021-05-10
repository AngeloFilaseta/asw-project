import SVGContainer from "../../common/SVGContainer";

export default function ReportEntry(props) {

    return (
        <>
            <h1 className={"text-center"}>{props.username}'s report</h1>
            <div align="center">
                        {alternateListsElements(props.sentences, props.draws)
                            .map((entry, index) => renderContent(entry, index))}
            </div>
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

    function renderContent(entry, index){
        if(index % 2 === 0){
            return <h3 className={"pt-2"} key={index}>"{entry}"</h3>
        } else {
            return <SVGContainer containerID={"svg-container-"+ index} svgString={entry} key={index}/>
        }
    }

}
