/** ScatterChart.js */

import React from "react";
import * as d3 from "d3";

const ScatterPoint = ({ data = [], color, x, y, xScale, yScale, setSelector, selector, sort, ...props}) => {
  const ref = React.useRef(null);
  var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

  const initial = React.useCallback(() => {
    const svg = d3.select(ref.current);
    svg
      .selectAll("*").remove(); 
    // Draw the bars
    svg
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr('class', (d, i) => "dot"+i)
        .attr("cx", d => xScale(0))
        .attr("fill-opacity",1)
        .on('mouseenter', handleMouseOver)
        .on('mouseleave', handleMouseOut)
        .on('dblclick', handleDblClick)
        .on('contextmenu', handleRightClick)
        .on("mouseover", (event, d) => {		
          div.transition()		
              .duration(200)		
              .style("opacity", .9);		
          div	.html((d.owner) + "<br/>"  + d.type)	
              .style("left", (event.pageX) + "px")		
              .style("top", (event.pageY - 28) + "px");	
          })
        .on("mouseout", function(d) {		
          div.transition()		
              .duration(500)		
              .style("opacity", 0);	
        });

    function handleMouseOver(d, i) {  
      setSelector("." + d3.select(this).attr("class"))
    }

    function handleMouseOut(d, i) {
      setSelector(null)
    }

    function handleDblClick(d, i) {
      console.log("DoubleClicked")
    }

    function handleRightClick(e) {
      e.preventDefault();
      console.log("RightClicked")
    }
  }, []);

  //Initial only Fires ONCE, it will not render everything...
  React.useEffect(() => {
    initial();
  }, [initial]);

  React.useEffect(() => {
    console.log("In yScale Change")
    const svg = d3.select(ref.current);
    svg.selectAll('circle')
      .attr('fill', 'black')
      .transition()
      .duration(500)
      //  .delay((d, i) => i * .1)
      .attr("cx", d => xScale(d[x]))
      .attr("cy", d => yScale(d[y]))
      .attr("r", 4)
      .style("fill", color)

  }, [ref, data, yScale, xScale, x, y, color]);

  return (
    <g ref={ref}/>
  );
};

export default ScatterPoint;