import { Card, Button } from "react-bootstrap"
import { Col } from "react-bootstrap"

export default function ReportCard(props) {

    return (
        <>
            <Col className="col-lg-3 col-12 col-md-6 mt-3">
                <Card>
                    <Card.Header>
                        <Card.Title align="center">
                            {props.title}
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Button block variant="primary" onClick={() => props.handler()}>Download PDF</Button>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}