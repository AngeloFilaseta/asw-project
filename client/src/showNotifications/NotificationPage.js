import React from 'react';

import GuessrNavbar from '../components/GuessrNavbar';
import ReportCard from './ReportCard';
import { Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { serverUrl } from '../util/util';
import { useSelector } from 'react-redux';
import BackToLogin from '../components/BackToLogin';
import BackButton from '../components/BackButton';
import { NotificationContainer } from 'react-notifications';
import NotificationCard from "./NotificationCard";

function ReportPage(props) {

    var username = useSelector(state => state.username);
    var notificationList = useSelector(state => state.previousReports); //TODO: creare previousNotification

    if (username === null) {
        return (<BackToLogin />);
    } else {
        return (
            <>
                <NotificationContainer/>
                <GuessrNavbar title={"Notification center"} />
                <div align="center">
                    <div className="col-lg-2  col-6 my-3">
                        <BackButton handleFunction={() => null} route={"/home"} buttonName={"Go back"} />
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
    var i = 0;
    return (
        <>
            {notificationList.map(listitem => (
                <NotificationCard
                    title={listitem.map.title}
                    description={listitem.map.description}
                    date={listitem.map.date}
                    key={"notification " + i++}
                />
            ))}
        </>
    );
}



