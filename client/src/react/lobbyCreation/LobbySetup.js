import React from 'react';

import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LanguageForm from "../common/LanguageForm";
import {setIsLoading} from "../../redux/util/actions";
import {setIsPublic, setLanguage, setNTurns} from "../../redux/lobby/actions";
import {DEFAULT_IS_PUBLIC, DEFAULT_LANGUAGE, DEFAULT_N_TURNS} from "../../util/global";

export default function LobbySetup(props) {

    const dispatch = useDispatch();

    return (
        <>
            <h3>Set Number of Turns:</h3>
            <Form.Control onChange={props.handleChangeNTurns} type="number" min="1" size="lg" placeholder="Set Number of Turns" defaultValue={DEFAULT_N_TURNS} />
            <h3>Select Language:</h3>
            <LanguageForm 
                onChange={props.handleChangeLanguage} 
                onSendPost={() => dispatch(setIsLoading(true))}
                onPostResult={() => dispatch(setIsLoading(false))}
            />
            <Row className="mt-3  w-48">
                <Col>
                    {getCreateButton(props, useSelector(state => state.lobby.code), useSelector(state => state.loading))}
                    {/* TODO INSERT BACK BUTTON*/}
                </Col>
            </Row>
        </>
    );
}

function handleBackButton(dispatch) {
    dispatch(setIsPublic(DEFAULT_IS_PUBLIC));
    dispatch(setNTurns(DEFAULT_N_TURNS));
    dispatch(setLanguage(DEFAULT_LANGUAGE));
}

function getCreateButton(props, lobbyCode, isLoading) {
    if (lobbyCode === null || lobbyCode === undefined) {
        return (<Button block size="lg" onClick={props.createLobbyFunction}>Create Lobby</Button>);
    } else {
        if (isLoading === true) {
            return (
                <Button block variant="primary" size="lg" disabled>
                    <Spinner
                        as="span"
                        animation="border"
                        size="slg"
                        role="status"
                        aria-hidden="true"
                    />
                    <span className="sr-only">Loading...</span>
                </Button>
            )
        } else {
            return (<Link to="/lobby"><Redirect to="/lobby" /></Link>);
        }
    }
}

