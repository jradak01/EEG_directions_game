import React, { useState, useEffect } from 'react';
import { Modal, Button, ListGroup, Alert } from 'react-bootstrap';
import modelAkcije from '../services/flask_conn';
import { MdDelete } from "react-icons/md";

const ModalView = ({ handleClose, show, model, side }) => {
    const [modelName, setModelName] = useState([]);
    const [returnModel, setReturnedModel] = useState("");
    const [showAlert, setShow] = useState(false);
    const [name, setName] = useState("")
    const [id, setId] = useState("");

    const getModelName = (data) => {
        let models = data.map((model, index) => Object.assign({ id: index, modelFile: model }))
        setModelName(models);
    }
    const exit = async () => {
        handleClose();
        model(returnModel);
        if (returnModel !== "" && side == "game") {
            const sendModel = await modelAkcije.sendModel({ returnModel })
        } else if (returnModel !== "" && side == "train") {
            const sendData = await modelAkcije.sendExistingData({ returnModel })

        }
    }
    const deleteD = async () => {

        const deleteDat = await modelAkcije.deleteData({ name })
        const newNames = modelName.filter((m) => m.id !== id);
        setModelName(newNames);
        setName("")
        setId("")
        setReturnedModel("")
        setShow(false);
    }
    const closeAlert = (name, id) => {
        setName(name)
        setId(id);
        setShow(true);
    }
    useEffect(() => {
        side == "game" ?
            modelAkcije.getModel()
                .then((res) => {
                    getModelName(res.data)
                }) :
            modelAkcije.getData()
                .then((res) => {
                    getModelName(res.data)
                })
    }, []);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{ backgroundColor: 'whitesmoke' }}>
                    <Modal.Title>
                        Select a trained {side == "game" ? "model" : "CSV"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'whitesmoke' }}>
                    {
                        side == "game" ?
                            <ListGroup style={{ width: '100%' }}>
                                {modelName.map((modelN) => <ListGroup.Item action key={modelN.id}
                                    onClick={() => setReturnedModel(modelN.modelFile)}>
                                    {modelN.modelFile}
                                </ListGroup.Item>)}
                            </ListGroup> : <ListGroup style={{ width: '100%' }}>
                                {modelName.map((modelN) => <ListGroup.Item action key={modelN.id} style={{ display: 'flex', justifyContent: 'space-between' }}
                                    onClick={() => setReturnedModel(modelN.modelFile)} onDoubleClick={() => closeAlert(modelN.modelFile, modelN.id)}>
                                    {modelN.modelFile}
                                </ListGroup.Item>)}
                            </ListGroup>
                    }
                    <p style={{ fontSize: '1.2em', margin: '10px' }}>Selected {side == "game" ? "model" : "CSV"}: {returnModel}</p>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: 'whitesmoke' }}>
                    <Button variant="dark" onClick={exit} style={{fontWeight: '480'}}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            {showAlert ?
                <Alert variant="danger" onClose={() => setShow(false)} className="alert-fixed" dismissible >
                    <Alert.Heading>Are you sure you want to delete this file? </Alert.Heading>
                    <p>
                        If you delete this file, it will no longer be available on this page.
                        <Button onClick={() => deleteD(name)} style={{fontWeight: '480'}} variant="outline-danger"><MdDelete /></Button>
                    </p>
                </Alert> : <div></div>
            }
        </>
    );
}
export default ModalView;