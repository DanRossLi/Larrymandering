import React from "react";
import useDimensions from "./useDimensions";
import { getScale } from "./Scaling";

export const GraphWrapper = ({graph:Graph, margin, data, x, y, xtype, ytype, dimensions, ...props}) => {
  const ref = React.useRef(null);
  const [containerRef, { svgWidth, svgHeight, width, height }] = useDimensions({
    maxHeight: 2000,
    margin
  });
  
  const xScale = React.useMemo(
    () => getScale(data, x, 0, width, xtype),
    [data, x, xtype, width])

  const yScale = React.useMemo(
    () => getScale(data, y, height, 0, ytype),
    [data, y, ytype, height])
  
  return (
    <div ref={containerRef}>
      <svg ref={ref} width={svgWidth} height={svgHeight}>
        <g transform={`translate(${margin?.left || 0},${margin?.top || 0})`}>    
          <Graph 
            data={data} 
            margin={margin}
            x={x}
            y={y}
            xScale={xScale}
            yScale={yScale}
            dimensions={dimensions} 
            width={width}
            height={height}
            svgWidth={svgWidth}
            svgHeight={svgHeight}
            props={props}
          />
        </g>
      </svg>
    </div>
  );
}
