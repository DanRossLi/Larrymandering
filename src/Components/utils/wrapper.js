import React from "react";
import useDimensions from "./useDimensions";

export const GraphWrapper = ({graph:Graph, margin, data, dimensions, ...props}) => {
  const ref = React.useRef(null);
  const [containerRef, { svgWidth, svgHeight, width, height }] = useDimensions({
    maxHeight: 2000,
    margin
  });
  
  return (
    <div ref={containerRef}>
      <svg ref={ref} width={svgWidth} height={svgHeight}>
        <g transform={`translate(${margin?.left || 0},${margin?.top || 0})`}>    
          <Graph 
            data={data} 
            margin={margin}
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
