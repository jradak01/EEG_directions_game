import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { BsFillEyeFill } from "react-icons/bs";
import './stil.css'
import './grid.css';
import Chart from './Chart';
import Instructions from './Instructions';
import Btn from './Btn';
import ModalData from './ModalData';
import socket from '../services/socket-io';

const CollectElement = () => {
    //records
    const [connect, setConnect] = useState(false)
    // select options
    const options = ['', 'Up', 'Down', 'Right', 'Left'];
    // select
    // const [value, setValue] = useState('')
    // modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // colors of arrows
    const [colorUp, setColorUp] = useState('#344c73');
    const [colorLeft, setColorLeft] = useState('#344c73');
    const [colorDown, setColorDown] = useState('#344c73');
    const [colorRight, setColorRight] = useState('#344c73');
    //eeg data
    const [delta, setDelta] = useState([])
    const [theta, setTheta] = useState([])
    const [lowAlpha, setLowAlpha] = useState([])
    const [highAlpha, setHighAlpha] = useState([])
    const [lowBeta, setLowBeta] = useState([])
    const [highBeta, setHighBeta] = useState([])
    const [lowGamma, setLowGamma] = useState([])
    const [highGamma, setHighGamma] = useState([])
    const [name, setName] = useState([])
    const [att, setAtt] = useState(0);
    const [med, setMed] = useState(0);
    //data - save in csv
    const [dataCsv, setDataCsv] = useState([["Attention", "Meditation", "Delta",
        "Theta", "LowAlpha",
        "HighAlpha", "LowBeta",
        "HighBeta", "LowGamma",
        "HighGamma", "Direction"]])
    // const [dataCsvCollect, setDataCsvCollect] = useState([]);
    const [number, setNumber] = useState(1)
    const [numberBorder, setNumberBorder] = useState("")
    const [nameCsv, setNameCsv] = useState('')
    const [count, setCount] = useState(0);
    // const [isStarted, setIsStarted] = useState(false);
    const isStarted = useRef(false);
    const countRef = useRef(null);
    countRef.current = count;
    // collect data turn 
    const dataRef = useRef([])
    const optionRef = useRef('Up')
    // on select change color and get value to think about
    const onOptionChangeHandler = (event) => {
        // setValue(event.target.value === "" ? 'Up' : event.target.value)
        optionRef.current = event.target.value === "" ? 'Up' : event.target.value;
        if (event.target.value === 'Up') {
            setColorUp('#e0544a')
            setColorDown('#344c73')
            setColorRight('#344c73')
            setColorLeft('#344c73')
        } else if (event.target.value === 'Down') {
            setColorDown('#e0544a')
            setColorUp('#344c73')
            setColorRight('#344c73')
            setColorLeft('#344c73')
        } else if (event.target.value === 'Right') {
            setColorRight('#e0544a')
            setColorDown('#344c73')
            setColorUp('#344c73')
            setColorLeft('#344c73')
        } else if (event.target.value === 'Left') {
            setColorLeft('#e0544a')
            setColorDown('#344c73')
            setColorRight('#344c73')
            setColorUp('#344c73')
        }
    }
    // get data from eeg
    const getData = (data) => {
        console.log(isStarted.current)
        if (isStarted.current) {
            let data_new=[data.attention, data.meditation,
                data.delta, data.theta, data.lowAlpha, data.highAlpha, data.lowBeta, data.highBeta,
                data.lowGamma, data.highGamma, optionRef.current]
            dataRef.current = [...dataRef.current, data_new]
            console.log(dataRef.current)
            console.log(data)
        }
        setDelta(delta => [...delta, data.delta]);
        setTheta(theta => [...theta, data.theta]);
        setLowAlpha(lowAlpha => [...lowAlpha, data.lowAlpha]);
        setHighAlpha(highAlpha => [...highAlpha, data.highAlpha]);
        setLowBeta(lowBeta => [...lowBeta, data.lowBeta]);
        setHighBeta(highBeta => [...highBeta, data.highBeta]);
        setLowGamma(lowGamma => [...lowGamma, data.lowGamma]);
        setHighGamma(highGamma => [...highGamma, data.highGamma]);
        setName(name => [...name, data.name]);
        setAtt(data.attention != null ? data.attention : 0);
        setMed(data.meditation != null ? data.meditation : 0)
    }
    const start = () => {
        // setIsStarted(true);
        isStarted.current = true;
        dataRef.current = [];
        startRecording();
    }
    // record eeg signal for some time
    const startRecording = () => {
        const timer = setInterval(() => {
            if (countRef.current >= number) {
                clearInterval(timer);
                setCount(0)
                setDataCsv(dataCsv => dataCsv.concat(dataRef.current))
                // setDataCsvCollect([])
                setNumberBorder("")
                // setIsStarted(false);
                isStarted.current = false;
            } else {
                setCount((count) => count + 1);
                console.log(countRef.current)
                setNumberBorder(countRef.current)
            }
        }, 1000);
    }
    // get data from socket
    useEffect(() => {
        if (connect) {
            socket.on("neurodata", data_neuro => {
                getData(data_neuro);
            });
        }
    }, [connect]);
    return (
        <div className="grid-container">
            <img className='backgorund-image'
                src="https://wallpapershome.com/images/wallpapers/abstract-3840x2160-colorful-ipad-pro-2018-4k-20825.jpg">
            </img>
            <div className="box-insert">
                <Instructions colorUp={colorUp} colorDown={colorDown}
                    colorRight={colorRight} colorLeft={colorLeft} />
            </div>
            <div className="box-chart">
                <Chart delta={delta} theta={theta} lowAlpha={lowAlpha} highAlpha={highAlpha}
                    lowBeta={lowBeta} highBeta={highBeta} lowGamma={lowGamma} highGamma={highGamma}
                    name={name} att={att} med={med}
                />
            </div>
            <div className="box-command box-command1">
                <label>
                    Number of records per direction:
                    <input type="number" name="number" id='number' min={1}
                        max={240} value={number}
                        onChange={(event) => setNumber(event.target.value)} />
                    <span>{numberBorder} s</span>
                </label>
                <select onChange={onOptionChangeHandler}>
                    {options.map((option, index) => {
                        return <option key={index} >
                            {option}
                        </option>
                    })}
                </select>
                <Button variant="dark" className='btn-command' id="btn-start" onClick={start}>
                    Start
                </Button>
            </div>
            <div className="box-command box-command2">
                <label>
                    Name of .csv file:
                    <input type="text" name="nameCsv" placeholder='data.csv'
                        id='nameCsv' value={nameCsv}
                        onChange={(event) => setNameCsv(event.target.value)} />
                </label>
                <Btn dataCsv={dataCsv} nameCsv={nameCsv} />
                <Button variant="dark" onClick={handleShow}><BsFillEyeFill/></Button>
                <Button variant="dark" className='btn-command' id="btn-rh"
                    onClick={() => setConnect(connect ? false : true)}>Connect</Button>
            </div>
            <div className="box">
            </div>
            <ModalData show={show} handleShow={handleShow} handleClose={handleClose} data={dataCsv} deleteData={setDataCsv}/>
        </div>
    );
}
export default CollectElement;