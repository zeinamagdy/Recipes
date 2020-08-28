import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'


const BarChart = () => {
    const [data, setData] = useState([1, 2, 4, 5])
    const canvas = useRef(null)
    useEffect(() => {
        drawBarChart(data)
    }, [data])
    const drawBarChart = (data) => {
        const canvasHeight = 400
        const scale = 20
        const svgCanvas = d3.select(canvas.current)
            .append("svg")
            .attr("width", 600)
            .attr("height", 400)
            .style("border", "1px solid black")

        svgCanvas.selectAll("rect")
            .data(data).enter()
            .append("rect")
            .attr("width", 40)
            .attr("height", (datapoint) => datapoint * 20)
            .attr("fill", "orange")
            .attr("x", (datapoint, iteration) => iteration * 45)
            .attr("y", (datapoint) => canvasHeight - datapoint * scale)
    }
    return (<div ref={canvas}></div>)
}

export default BarChart;