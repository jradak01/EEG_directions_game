import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import './stil.css';
// import modelAkcije from '../services/flask_conn';
import { MdDelete } from "react-icons/md";

const ModalData = ({ handleClose, show, data, deleteData }) => {
    const deleteDataEm = () => {
        deleteData([["Attention", "Meditation", "Delta",
                    "Theta", "LowAlpha",
                    "HighAlpha", "LowBeta",
                    "HighBeta", "LowGamma",
                    "HighGamma", "Direction"]])
    }
    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
            <Modal.Header closeButton style={{ backgroundColor: 'whitesmoke' }}>
                <Modal.Title>
                    Data that will be saved in a CSV file
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: 'whitesmoke' }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {
                                data[0].map((eeg, index) =>
                                    <th key={index}>{eeg}</th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.slice(1).map((eeg, index) =>
                                <tr key={index}>
                                    {eeg.map((dat, indexs) =>
                                        <td key={indexs}>{dat}</td>
                                    )}
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: 'whitesmoke' }}>
                <Button variant="danger" onClick={deleteDataEm} ><MdDelete /></Button>
            </Modal.Footer>
        </Modal>
    );
}
export default ModalData;