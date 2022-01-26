/** ScatterChart.js */

import React from "react";
import { GraphWrapper } from "./utils/wrapper"
import Axis from "./utils/Axis"
import GridLine from "./utils/GridLine"
import ScatterPoint from "./utils/ScatterPoint"


export const ScatterChart = ({ data = [], x, y, xScale, yScale, ...props}) => {
  return (
    <React.Fragment>
      <Axis
        type="left"
        className="axisY"
        scale={yScale}
        transform={`translate(${props.margin.left}, 0)`}
        ticks={5}
        color={"black"}
      />
      <GridLine
        type="horizontal"
        className="gridY"
        scale={yScale}
        ticks={5}
        size={props.width}
        color={"rgba(0, 0, 0, 0.2)"}
        transform={`translate(${props.margin.left}, 0)`}
        disableAnimation
      />
      <Axis
        type="bottom"
        className="axisX"
        scale={xScale}
        color={"white"}
        transform={`translate(${props.margin.left}, ${props.svgHeight - props.margin.bottom - props.margin.top})`}
        ticks={5}
      />
      <GridLine
        type="vertical"
        className="gridX"
        scale={xScale}
        ticks={5}
        size={props.height}
        color={"rgba(0, 0, 0, 0.2)"}
        transform={`translate(${props.margin.left}, ${props.height})`}
      />

      <ScatterPoint
        data={data}
        color={"black"}
        x={x}
        y={y}
        xScale={xScale}
        yScale={yScale}
        props={props}      
      />
    </React.Fragment>
  );
};

const Example = ({data}) => {
  return (
    <div>
      {data && 
        <GraphWrapper
        graph = {ScatterChart}
        margin ={{left: 20, right: 20, top: 30, bottom: 50}}
        data={data}
        x = {"x"}
        y = {"y"}
        xtype = {"linear"}
        ytype = {"linear"}
        dimensions={{width: 1200, height: 1200, margin: 10}}
      />}
    </div>
  );
}

export default Example;