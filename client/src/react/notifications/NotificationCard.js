import React from 'react';

import { Card } from 'react-bootstrap'
import { Col } from 'react-bootstrap';
import DeleteButton from "./DeleteButton";

function NotificationCard(props) {
    return (
        <>
            <Col className="col-lg-3 col-12 col-md-6 mt-3">
                <Card className="border-dark" >
                    <Card.Header>
                        <Card.Title align="center" style={{ fontSize: 22 }}>
                            {props.title}
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div>
                            {props.description}
                        </div>
                        <div>
                            {props.date}
                        </div>
                        <div className="text-right">
                            <DeleteButton idNotification={props.id} />
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
}

export default NotificationCard;
