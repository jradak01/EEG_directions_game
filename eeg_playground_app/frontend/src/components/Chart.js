import React from 'react';
// import socket from '../services/socket-io';
import Plot from 'react-plotly.js';
import { ProgressBar } from 'react-bootstrap';

const Chart = ({delta, theta, lowAlpha, highAlpha, lowBeta, highBeta, lowGamma, highGamma, name, att, med}) => {
    return (
        <div>
            <Plot
                data={[
                    {
                        x: name,
                        y: delta,
                        type: 'scatter',
                        mode: 'lines+markers',
                        name: 'Delta',
                        marker: { color: '#e0544a' },
                    },
                    {
                        x: name,
                        y: theta,
                        type: 'scatter',
                        mode: 'lines+markers',
                        name: "Theta",
                        marker: { color: '#e0904a' },
                    },
                    {
                        x: name,
                        y: lowAlpha,
                        type: 'scatter',
                        mode: 'lines+markers',
                        name: "Low Alpha",
                        marker: { color: '#e0c74a' },
                    },
                    {
                        x: name,
                        y: highAlpha,
                        type: 'scatter',
                        mode: 'lines+markers',
                        name: "High Alpha",
                        marker: { color: '#7bbf5e' },
                    },
                    {
                        x: name,
                        y: lowBeta,
                        type: 'scatter',
                        mode: 'lines+markers',
                        name: "Low Beta",
                        marker: { color: '#5ebfac' },
                    },
                    {
                        x: name,
                        y: highBeta,
                        type: 'scatter',
                        mode: 'lines+markers',
                        name: "High Beta",
                        marker: { color: '#344c73' },
                    },
                    {
                        x: name,
                        y: lowGamma,
                        type: 'scatter',
                        mode: 'lines+markers',
                        name: "Low Gamma",
                        marker: { color: '#654d7d' },
                    },
                    {
                        x: name,
                        y: highGamma,
                        type: 'scatter',
                        mode: 'lines+markers',
                        name: "High Gamma",
                        marker: { color: '#9c6e8f' },
                    },
                ]}
                layout={{
                    title: 'EEG data', plot_bgcolor: "whitesmoke",
                    paper_bgcolor: "whitesmoke"
                }}
            />
            <div>Attention:</div>
            <ProgressBar striped variant="warning" now={att} />
            <div>Meditation:</div>
            <ProgressBar striped variant="danger" now={med} />
        </div>
    );
}

export default Chart;