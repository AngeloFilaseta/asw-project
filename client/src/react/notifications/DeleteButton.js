import Button from "react-bootstrap/Button"
import trashIcon from "../../img/trash.png"
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import React, {useState} from "react";

export default function DeleteButton(props) {

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (<>
                <Button className=" btn-danger"
                     onClick={handleShow}>
                    <img alt="Delete" style={{ width: "30px", height: "30px" }} src={trashIcon}/>
                </Button>
                <DeleteConfirmationModal show={show} handleClose={handleClose} idNotification={props.idNotification}/>
            </>
        )
}
