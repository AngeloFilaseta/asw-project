import React from 'react';

import { Card } from 'react-bootstrap'
import { Col } from 'react-bootstrap';

function NotificationCard(props) {

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
                        <div>
                            {props.description}
                        </div>
                        <div>
                            {props.now}
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
}

export default NotificationCard;
