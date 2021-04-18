import React from 'react';

import { Card } from 'react-bootstrap'
import { Col } from 'react-bootstrap';
import DeleteButton from "./DeleteButton";


function NotificationCard(props) {

    return (
        <>
            <Col className="col-lg-3 col-12 col-md-6 mt-3">
                <Card>
                    <Card.Header>
                        <Card.Title align="center">
                            {props.title}
                            <DeleteButton
                            idNotification={props.id}
                            />
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div>
                            {props.description}
                        </div>
                        <div>
                            {props.date}
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
}

export default NotificationCard;
