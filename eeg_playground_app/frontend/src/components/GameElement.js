import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { FaRobot, FaPlay } from "react-icons/fa";
import './stil.css';
import './grid.css';
import Chart from './Chart';
import Game from './Game';
import ModalView from './Modal';
import socket from '../services/socket-io';
import modelAkcije from '../services/flask_conn';

let side = "game";
const GameElement = () => {
    const [start, getStarted] = useState(true);
    const [connect, setConnect] = useState(false);
    // modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // chosen model that will be predicting direction
    const [selectedModel, setSelectedModel] = useState("");
    // eeg data
    const [delta, setDelta] = useState([])
    const [theta, setTheta] = useState([])
    const [lowAlpha, setLowAlpha] = useState([])
    const [highAlpha, setHighAlpha] = useState([])
    const [lowBeta, setLowBeta] = useState([])
    const [highBeta, setHighBeta] = useState([])
    const [lowGamma, setLowGamma] = useState([])
    const [highGamma, setHighGamma] = useState([])
    const [name, setName] = useState([])
    const [attention, setAttention] = useState(0)
    const [meditation, setMeditation] = useState(0)
    const [eeg_data, setEegData] = useState([0, 0, 0, 0, 0, 0, 0])
    // model predictions
    const [direction, setDirection] = useState(1)
    // get data from eeg
    const getData = (data) => {
        setAttention(data.attention);
        setMeditation(data.meditation);

        setDelta(delta => [...delta, data.delta]);
        setTheta(theta => [...theta, data.theta]);
        setLowAlpha(lowAlpha => [...lowAlpha, data.lowAlpha]);
        setHighAlpha(highAlpha => [...highAlpha, data.highAlpha]);
        setLowBeta(lowBeta => [...lowBeta, data.lowBeta]);
        setHighBeta(highBeta => [...highBeta, data.highBeta]);
        setLowGamma(lowGamma => [...lowGamma, data.lowGamma]);
        setHighGamma(highGamma => [...highGamma, data.highGamma]);
        setName(name => [...name, data.name]);
        setEegData([data.theta, data.lowAlpha, data.highAlpha, data.lowBeta, data.highBeta, data.lowGamma, data.highGamma])
    }
    //setting game
    const setGame = () => {
        getStarted(false)
        setConnect(connect ? false : true)
    }
    // get data from socket
    useEffect(() => {
        if (connect) {
            socket.on("neurodata", data_neuro => {
                getData(data_neuro);
            });
        }
    }, [connect]);
    // get data from model
    useEffect(() => {
        const interval = setInterval(() => {
            modelAkcije.getDirection({ selectedModel, eeg_data}).then(res => {
                setDirection(res.data)
                console.log(res.data)
            })
        }, 1000)
        return () => clearInterval(interval)
    });
    if (start) {
        return (
            <div className='how-to-play'>
                <div className='card-play'>
                    <div className='text'>
                        <p>Choose a model on <FaRobot />, press play and have fun!</p>
                    </div>
                    <div className='btns'>
                        <img className='backgorund-image' alt=""
                            src="https://wallpapershome.com/images/wallpapers/abstract-3840x2160-colorful-ipad-pro-2018-4k-20825.jpg">
                        </img>
                        <Button variant="dark" className='btn-icon' id="btn-modal" onClick={setGame}>
                            <FaPlay />
                        </Button>
                        <Button variant="dark" className='btn-icon' id="btn-modal" onClick={handleShow}>
                            <FaRobot />
                        </Button>
                    </div>
                    <ModalView show={show} handleShow={handleShow} handleClose={handleClose} model={setSelectedModel} modal={show} side={side} />
                </div>
            </div>
        );
    }
    return (
        <div className='grid-container'>
            <div className="box-insert">
                <Game attention={attention} meditation={meditation} direction={direction} />
            </div>
            <img className='backgorund-image' alt=""
                src="https://wallpapershome.com/images/wallpapers/abstract-3840x2160-colorful-ipad-pro-2018-4k-20825.jpg">
            </img>
            <div className="box-chart">
                <Chart delta={delta} theta={theta} lowAlpha={lowAlpha} highAlpha={highAlpha}
                    lowBeta={lowBeta} highBeta={highBeta} lowGamma={lowGamma} highGamma={highGamma}
                    name={name} att={attention} med={meditation}
                />
            </div>
        </div>
    );
}

export default GameElement;