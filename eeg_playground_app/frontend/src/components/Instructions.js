import React from 'react';
import './stil.css'
import {
    BsFillArrowUpCircleFill,
    BsFillArrowDownCircleFill,
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill
} from "react-icons/bs";

const Instructions = ({ colorUp, colorDown, colorLeft, colorRight }) => {
    return (
        <div className="grid-container2">
            <div className="box6">
            </div>
            <div className="box1">
                <BsFillArrowUpCircleFill className='icon' style={{ color: colorUp }} />
            </div>
            <div className="box">
            </div>
            <div className="box3">
                <BsFillArrowLeftCircleFill className='icon' style={{ color: colorLeft }} />
            </div>
            <div className="box">
            </div>
            <div className="box4">
                <BsFillArrowRightCircleFill className='icon' style={{ color: colorRight }} />
            </div>
            <div className="box">
            </div>
            <div className="box5">
                <BsFillArrowDownCircleFill className='icon' style={{ color: colorDown }} />
            </div>
            <div className="box">
            </div>
        </div>
    );
}

export default Instructions;