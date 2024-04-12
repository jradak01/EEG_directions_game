import React from "react";
import Plot from "react-plotly.js";

const LineGraph = ({ err1, err2, range}) => {
    const data = [
        {
            x: range,
            y: err1,
            type: 'scatter',
            mode: 'lines',
            name: "Train",
            marker: { color: '#e0904a' }
        },
        {
            x: range,
            y: err2,
            type: 'scatter',
            mode: 'lines',
            name: "Test",
            marker: { color: '#7bbf5e' }
        }
    ];
    const layout = {
        title: "Error rate",
        width: 500,
        height: 500,
        plot_bgcolor: ' #F5F5F5',
        paper_bgcolor: ' #F5F5F5',
    };
    return (
        <Plot
            data={data}
            layout={layout}
        />
    )
}

export default LineGraph;