/** ScatterChart.js */

import React from "react";
import { GraphWrapper } from "./utils/wrapper"
import Geo from "./utils/Geo"

export const GeoGraph = ({ data = {}, ...props}) => {
  return (
    <React.Fragment>
      <Geo
        data={data}
        color={"black"}
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
        graph = {GeoGraph}
        margin ={{left: 20, right: 20, top: 30, bottom: 50}}
        data={data}
        x = {"x"}
        y = {"y"}
        xtype = {"linear"}
        ytype = {"linear"}
        dimensions={{width: 600, height: 600, margin: 10}}
      />}
    </div>
  );
}

export default Example;