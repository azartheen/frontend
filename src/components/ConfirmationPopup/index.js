import React, {useState} from 'react';
import Select from 'react-select';
import {Button, Modal} from 'react-bootstrap'

// popup that askes for confirmation
export default props => {
    return <Modal show={props.show} onHide={props.onClose}>
        <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
            <Button variant="secondary" onClick={props.onClose}>Close</Button>
            <Button variant="primary" onClick={props.onConfirm}>Confirm</Button>
        </Modal.Footer>
    </Modal>
}