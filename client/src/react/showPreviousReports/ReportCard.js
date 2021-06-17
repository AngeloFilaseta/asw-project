import { Card } from "react-bootstrap"
import { Col } from "react-bootstrap"
import { AwesomeButton } from "react-awesome-button";

export default function ReportCard(props) {

    return (
        <>
            <Col className="col-lg-3 col-12 col-md-6 mt-3">
                <Card className="border-dark" style={{background:"rgba(255,255,255, 0.85)"}}>
                    <Card.Header>
                        <Card.Title align="center">
                            {props.title}
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <AwesomeButton onPress={() => props.handler()}
                            className="mb-2"
                            style={{ display: 'block', width: '100%', fontSize: 18 }}
                            type="primary" ripple={true}>
                            Download PDF
                        </AwesomeButton>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}