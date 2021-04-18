import React from 'react';

import { Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import NotificationCard from "./NotificationCard";
import GuessrNavbar from "../common/navbar/GuessrNavbar";

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
                        {/* <BackButton handleFunction={() => null} route={"/home"} buttonName={"Go back"} />  //TODO add redirect to login page */}
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
    let i = 0;
    return (
        <>
            {notificationList.map(item => (
                <NotificationCard
                    title={item.title}
                    description={item.description}
                    date={"DATE"} //TODO add date
                    key={"notification " + i++}
                />
            ))}
        </>
    );
}



