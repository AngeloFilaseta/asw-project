import React from 'react';
import {useSelector} from 'react-redux';
import {RedirectHome} from "../common/GuessrRedirect";
import GuessrNavbar from "../common/navbar/GuessrNavbar";
import BackButton from "../common/BackButton";
import Container from "react-bootstrap/Container";
import DeleteAllButton from "./DeleteAllButton";
import Row from "react-bootstrap/Row";
import {NotificationContainer} from "react-notifications"
import NotificationCard from "./NotificationCard";
import {Col} from "react-bootstrap";

function ReportPage(props) {

    let username = useSelector(state => state.userInfo.username);
    let notificationList = useSelector(state => state.userInfo.notifications);

    if (username === null) {
        return <RedirectHome />
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
                    {notificationList.length > 0 && <DeleteAllButton notificationIdArray={notificationList.map(n => n._id)}/>}
                    <Row>
                        {notificationList.length > 0 ?
                            updateList(notificationList) :
                            <Col><h3 className={"text-center"}> You're clear! 0 new notifications.</h3></Col>}
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



