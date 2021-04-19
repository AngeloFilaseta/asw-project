import React from 'react';

import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import VisibilitySwitch from './VisibilitySwitch';
import LobbySetup from './LobbySetup';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import LoadingOverlay from 'react-loading-overlay';
import GuessrNavbar from "../common/navbar/GuessrNavbar";
import {setLanguage, setNTurns} from "../../redux/lobby/actions";
import {RedirectHome} from "../common/GuessrRedirect";

export default function LobbyCreation() {

  const dispatch = useDispatch();

  let isPublic = useSelector(state => state.lobby.isPublic);
  let nTurns = useSelector(state => state.lobby.nTurns);
  let language = useSelector(state => state.lobby.language);
  let id_user = useSelector(state => state.userId);
  let username = useSelector(state => state.username);
  let isLoading = useSelector(state => state.loading);

  if (username === null) {
    return (<RedirectHome />);
  } else {
    return (
      <div>
        <NotificationContainer />
        <GuessrNavbar title="" />
        <LoadingOverlay
          active={isLoading}
          spinner
          text='Loading...'
        >
          <Container fluid className="rounded mt-5 p-3 col-11 col-md-6 col-lg-4 border border-primary rounded">
            <Row align="center">
              <Col>
                <Form>
                  <VisibilitySwitch />
                  <LobbySetup handleChangeNTurns={handleChangeNTurns(dispatch)}
                    handleChangeLanguage={handleChangeLanguage(dispatch)}
                    createLobbyFunction={createLobby(dispatch,
                      isPublic,
                      nTurns,
                      language,
                      username,
                      id_user)} />
                </Form>
              </Col>
            </Row>
          </Container>
        </LoadingOverlay>
      </div>
    );
  }
}

function handleChangeNTurns(dispatch) {
  return e => {
    dispatch(setNTurns(parseInt(e.target.value)));
  }
}

function handleChangeLanguage(dispatch) {
  return e => {
    dispatch(setLanguage(e.target.value));
  }
}

function createLobby(dispatch, isPublic, nTurns, language, username, id_user) {
  console.log(isPublic, nTurns, language, username, id_user)
  if (nTurns === null || Number.isNaN(nTurns) || nTurns < 0) {
    NotificationManager.error("Please insert the number of turns correctly!", 'Error', 3000);
  } else {
    return () => {
      //TODO SOCK JS
    }
  }
}
