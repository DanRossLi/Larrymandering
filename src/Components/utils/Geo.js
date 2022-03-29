/** ScatterChart.js */

import React from "react";
import * as d3 from "d3";

const Geo = ({ data = {}, color, setSelector, selector, sort, ...props}) => {
  const ref = React.useRef(null);
  var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
  
  console.log(props)
  console.log(props.props.svgWidth)

  var projection = d3.geoMercator().center([-114, 36]).scale([props.props.svgWidth/(Math.PI/7)]);

  if (props.props.svgWidth > 100) {
    projection = projection
  } 
    
  const path = d3.geoPath()
  .projection(projection)
  

  // Join the FeatureCollection's features array to path elements
  const initial = React.useCallback(() => {
    const svg = d3.select(ref.current);
    svg
      .selectAll("*").remove(); 
    // Draw the bars
    svg
      .selectAll('path')
      .data(data.features)
      .enter().append("path")
      .attr("d", path)
      .on('mouseenter', handleMouseOver)
      .on('mouseleave', handleMouseOut)
      .on('dblclick', handleDblClick)
      .on('contextmenu', handleRightClick)
      .attr("fill", "steelblue")

    function handleMouseOver(d, i) {  
      d3.select(this).attr("fill", "green")
    }

    function handleMouseOut(d, i) {
      d3.select(this).attr("fill", "steelblue")
    }

    function handleDblClick(d, i) {
      console.log("DoubleClicked")
    }

    function handleRightClick(e) {
      e.preventDefault();
      console.log("RightClicked")
    }
  }, [data, div, setSelector]);

  //Initial only Fires ONCE, it will not render everything...
  React.useEffect(() => {
    initial();
  }, [initial]);

  return (
    <g ref={ref}/>
  );
};

export default Geo;