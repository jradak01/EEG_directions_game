import React from 'react';
import './stil.css';
import { CSVLink, CSVDownload } from "react-csv";

const Btn = ({dataCsv, nameCsv}) => {
    return(
       <div className='btn-element'>
            <CSVLink id='link' data={dataCsv} filename={nameCsv}>Save</CSVLink>
       </div>
    );
}

export default Btn;