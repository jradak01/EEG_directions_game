import React from "react";
import Plot from "react-plotly.js";

const HeatMap = ({label1, label2, label3, label4, values1, values2, values3, values4}) => {
    const data = [
        {
            x: [label1, label2, label3, label4],
            y: [label1, label2, label3, label4],
            z: [values1, values2, values3, values4],
            type: 'heatmap',
            colorscale: [[0, 'rgb(255,255,255)'], [1, 'rgb(255, 174, 0)']],
            showscale: true,
        }
    ];
    const layout = {
        title: 'Confusion Matrix',
        annotations: [values1, values2, values3, values4],
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

export default HeatMap;