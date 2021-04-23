import React from 'react';

import { Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import NotificationCard from "./NotificationCard";
import GuessrNavbar from "../common/navbar/GuessrNavbar";
import BackButton from "../common/BackButton"

function ReportPage(props) {

    let username = useSelector(state => state.userInfo.username);
    let notificationList = useSelector(state => state.userInfo.notifications);

    if (username === null) {
        return null; //TODO add redirect to login page
    } else {
        return (
            <>
                <NotificationContainer/>
                <GuessrNavbar title={"Notification center"} />
                <div align="center">
                    <div className="col-lg-2  col-6 my-3">
                        <BackButton destination={"home"} buttonName={"Go back"}/>
                    </div>
                </div>
                <Container fluid >
                    <Row>
                          {updateList(notificationList)}
                    </Row>
                </Container>
            </>
        );
    }
}

export default ReportPage;

function updateList(notificationList) {
    return (
        <>
            {notificationList.map(item => (
                <NotificationCard
                    title={item.title}
                    description={item.description}
                    date={item.date}
                    id={item._id}
                    key={item._id}
                />
            ))}
        </>
    );
}



