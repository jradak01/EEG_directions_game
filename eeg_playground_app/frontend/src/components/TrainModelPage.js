import React, { useState } from 'react';
import { Button, Alert, Spinner } from 'react-bootstrap';
import './stil.css';
import './grid.css';
import { FileUploader } from "react-drag-drop-files";
import modelAkcije from '../services/flask_conn';
import ModalView from './Modal';
import HeatMap from './Heatmap';
import LineGraph from './LineGraph';

const fileTypes = ["CSV"];
let side = "train";

const Wait = ({ loaded }) => {
    if (loaded) {
        return (
            <div style={{ position: 'absolute', zIndex: '9999', textAlign: 'center', margin: 'auto', left: '0', right: '0', top: '50%' }}>
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="danger" />
            </div>);
    }
}

const TrainModelPage = () => {
    // alert
    const [showSuccess, setSuccess] = useState(false);
    // spinners
    const [load, setLoad] = useState(false);
    // modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // select model
    const options = ["KNN", "SVM"]
    const [value, setValue] = useState('KNN')
    // knn
    const metrics = ['minkowski', 'euclidean', 'manhattan', 'cosine']
    const [n_neighbors, setN_neighbors] = useState(3)
    const [metric, setMetric] = useState('minkowski')
    // svm 
    const [kernel, setKernel] = useState('rbf')
    const kernels = ['linear', 'rbf', 'poly', 'sigmoid']
    const [degree, setDegree] = useState('2') // if poly
    const [gamma, setGamma] = useState('0.1') // if poly or rbf
    const [c, setC] = useState(100)

    // scaling
    const scalers = ["No Scaler", "MinMax", "Robust"]
    const [scaler, setScaler] = useState("No Scaler");

    //returned by model
    const [accuracy, setAccuracy] = useState("")
    const [confMatrix, setConfMatrix] = useState([[100, 75, 50, 25],
    [25, 50, 75, 100],
    [100, 75, 50, 25],
    [25, 50, 75, 100]])
    const [error1, setError1] = useState([])
    const [error2, setError2] = useState([])
    const [range, setRange] = useState([])
    //model
    const [modelName, setModelName] = useState("myModel")

    // file
    const [selectedData, setSelectedData] = useState("");
    const [file, setFile] = useState(null);

    //file upload
    const handleChange = (file) => {
        setFile(file);
    };
    const uploadFile = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", file);
        const send = await modelAkcije.sendData(formData)
        setSelectedData(file.name)
        setSuccess(true);
    }

    const dohvatiRezultate = (accur, matrix_receved, err1, err2, rang) => {
        if (accur !== "") {
            setLoad(false)
        }
        setAccuracy(accur)
        if (matrix_receved !== 'nodata') {
            setConfMatrix(matrix_receved)
            setError1(err1)
            setError2(err2)
            setRange(rang)
        }
        console.log(accur, matrix_receved, err1, err2, rang)
    }
    const train = () => {
        setLoad(true);
        let modelSend = { modelName, selectedData, value, scaler, n_neighbors, metric }
        if (value === "SVM") {
            if (kernel === "poly") {
                modelSend = { modelName, selectedData, value, scaler, kernel, degree, c, gamma }
            }else if(kernel === 'rbf'){
                modelSend = { modelName, selectedData, value, scaler, kernel, c, gamma }
            }else {
                modelSend = { modelName, selectedData, value, scaler, kernel, c }
            }
        }
        modelAkcije.trainModel(modelSend).then(res => dohvatiRezultate(res.data.acc_score, res.data.confusionMTRX, res.data.error1, res.data.error2, res.data.range))
    }

    // choose model
    const onOptionChangeHandler = (event) => {
        setValue(event.target.value)
    }
    // choose scaler
    const onOptionChangeScaler = (event) => {
        setScaler(event.target.value)
    }
    // choose metrics
    const onOptionChangeMetric = (event) => {
        setMetric(event.target.value)
    }
    // choose kernel
    const onOptionChangeKernel = (event) => {
        setKernel(event.target.value)
    }
    return (
        <div className="grid-container">
            <img className='backgorund-image' alt="" src="https://wallpapershome.com/images/wallpapers/abstract-3840x2160-colorful-ipad-pro-2018-4k-20825.jpg"></img>
            <div className='box-drag-drop'>
                <div className='file-box'>
                    <FileUploader handleChange={handleChange} name="file" multiple={false} types={fileTypes} />
                    <Button variant="dark" id="btn-upload" className='btn-cmnd' onClick={uploadFile}>
                        Upload
                    </Button>
                    <p>Or select an existing one:</p>
                    <Button variant="dark" id="btn-modal" className='btn-cmnd' onClick={handleShow}>
                        Choose File
                    </Button>
                </div >
            </div>
            <ModalView show={show} handleShow={handleShow}
                handleClose={handleClose} model={setSelectedData} side={side}
            />
            {showSuccess ?
                <Alert variant="success" onClose={() => setSuccess(false)} className="alert-fixed1" dismissible>
                    <Alert.Heading>You have successfully uploaded the file!</Alert.Heading>
                </Alert> : ""
            }
            <div className='box-model-choose'>
                <div>Accuracy score: {accuracy !== "" ? <div>{(accuracy * 100).toFixed(2)}%</div> : ""}</div>
                <label>Model name:</label>
                <input type="text" name="modelName" placeholder='myModel' value={modelName}
                    onChange={(event) => setModelName(event.target.value)} />

            </div>
            <div className="box-graphs">
                <HeatMap label1={"Up"} label2={"Down"} label3={"Right"} label4={"Left"}
                    values1={confMatrix[0]} values2={confMatrix[1]}
                    values3={confMatrix[2]} values4={confMatrix[3]}
                />
                {value === 'KNN' ?
                    <LineGraph err1={error1} err2={error2} range={range} /> : ""
                }
            </div>
            <div className="box-parameters">
                <div className="row-parameters">
                    <label>Choose algorithm:</label>
                    <select name="select1" onChange={onOptionChangeHandler}>
                        {options.map((option, index) => {
                            return <option key={index} >
                                {option}
                            </option>
                        })}
                    </select>
                </div>
                <div className="row-parameters">
                    <label>Choose scaler:</label>
                    <select name="selectscaler" onChange={onOptionChangeScaler}>
                        {scalers.map((option, index) => {
                            return <option key={index} >
                                {option}
                            </option>
                        })}
                    </select>
                </div>
                {value === "KNN" ?
                    <div>
                        <div className="row-parameters">
                            <label>Select metric:</label>
                            <select name="metric" onChange={onOptionChangeMetric}>
                                {metrics.map((option, index) => {
                                    return <option key={index} >
                                        {option}
                                    </option>
                                })}
                            </select>
                        </div>
                        <div className="row-parameters">
                            <label>N neighbors:</label>
                            <input type="number" name="number1" id='number1' min={3}
                                max={20} value={n_neighbors}
                                onChange={(event) => setN_neighbors(event.target.value)} />
                        </div>
                    </div> : ""
                }
                {value === "SVM" ?
                    <div>
                        <div className="row-parameters">
                            <label>Select kernel:</label>
                            <select name="selectkernel" onChange={onOptionChangeKernel}>
                                {kernels.map((option, index) => {
                                    return <option key={index} >
                                        {option}
                                    </option>
                                })}
                            </select>
                        </div>
                        {kernel === 'poly' ?
                            <div className="row-parameters">
                                <label>Gamma:</label>
                                <input type="number" name="numbergamma" id='numbergamma' min={0.01}
                                    max={10} value={gamma}
                                    onChange={(event) => setGamma(event.target.value)} />
                                <label>Degree:</label>
                                <input type="number" name="number2" id='number2' min={2}
                                    max={5} value={degree}
                                    onChange={(event) => setDegree(event.target.value)} />
                            </div> : ""
                        }
                        {kernel === 'rbf' ?
                            <div className="row-parameters">
                                <label>Gamma:</label>
                                <input type="number" name="numbergamma" id='numbergamma' min={0.05}
                                    max={10} value={gamma}
                                    onChange={(event) => setGamma(event.target.value)} />
                            </div> : ""
                        }
                        <div className="row-parameters">
                            <label>C:</label>
                            <input type="number" name="number3" id='number3' min={0.1}
                                max={100} value={c}
                                onChange={(event) => setC(event.target.value)} />
                        </div>
                    </div>
                    : ""
                }
                <div className="row-parameters-btn">
                    <Button variant='warning' className='btn-cmnd' onClick={train}>Train</Button>
                </div>
            </div>
            <Wait loaded={load} />
        </div >
    );
}

export default TrainModelPage;