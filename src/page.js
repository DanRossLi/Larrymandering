import React from 'react'
import regl, { ReglFrame } from 'react-regl';
import * as d3 from "d3";

const Example = ({data}) => {
  const numPoints = data.length;
  let uniforms = []
  uniforms[0] = 4;
  uniforms[1] = 1.0;
  const width = window.innerWidth;
  const height = window.innerHeight;
  // function to compile a draw points regl func
  const xExtent = d3.extent(data, (d) => d.x)
  const yExtent = d3.extent(data, (d) => d.y)
  const xDomain = xExtent[1] - xExtent[0]
  const yDomain = yExtent[1] - yExtent[0]
  const xMid = (xExtent[1] + xExtent[0])/2
  const yMid = (yExtent[1] + yExtent[0])/2

  const ratio = Math.min(height/yDomain, width/xDomain)

  function newX(oldX) {
    return (oldX - xMid)*ratio + width/2
  }
  function newY(oldY) {
    return (oldY - yMid)*ratio + height/2
  }

  let col = (data.map(d => [1, 1, 0]))
  let pos = (data.map(d => [newX(d.x), newY(d.y)]))

  console.log(pos)
  const DrawPoints = regl({
    // Shaders in regl are just strings.  You can use glslify or whatever you want
    // to define them.  No need to manually create shader objects.

    vert: `
          // per vertex attributes
          attribute vec2 position;
          attribute vec3 color;

          // variables to send to the fragment shader
          varying vec3 fragColor;

          // values that are the same for all vertices
          uniform float pointWidth;
          uniform float stageWidth;
          uniform float stageHeight;

          // helper function to transform from pixel space to normalized device coordinates (NDC)
          // in NDC (0,0) is the middle, (-1, 1) is the top left and (1, -1) is the bottom right.
          vec2 normalizeCoords(vec2 position) {
              // read in the positions into x and y vars
        float x = position[0];
        float y = position[1];

              return vec2(
            2.0 * ((x / stageWidth) - 0.5),
            // invert y since we think [0,0] is bottom left in pixel space
            -(2.0 * ((y / stageHeight) - 0.5)));
          }

          void main() {
              // update the size of a point based on the prop pointWidth
              gl_PointSize = pointWidth;

        // send color to the fragment shader
        fragColor = color;

              // scale to normalized device coordinates
              // gl_Position is a special variable that holds the position of a vertex
        gl_Position = vec4(normalizeCoords(position), 0.0, 1.0);
          }
      `,

    frag:`
        // set the precision of floating point numbers
        precision highp float;

        // this value is populated by the vertex shader
          varying vec3 fragColor;

          void main() {
              // gl_FragColor is a special variable that holds the color of a pixel
              gl_FragColor = vec4(fragColor, 1);
          }
      `,

    // Here we define the vertex attributes for the above shader
    attributes: {
      // each of these gets mapped to a single entry for each of the points.
      // this means the vertex shader will receive just the relevant value for a given point.
      position: function(context, props) {
        return props.points
      },
      color: function(context, props) {
        return props.col
      },
    },

    uniforms: {
      // by using `regl.prop` to pass these in, we can specify them as arguments
      // to our drawPoints function
      pointWidth: function(context, props) {
        return props.uniforms[0]
      },
      // regl actually provides these as viewportWidth and viewportHeight but I
      // am using these outside and I want to ensure they are the same numbers,
      // so I am explicitly passing them in. 
      stageWidth: regl.prop('stageWidth'),
      stageHeight: regl.prop('stageHeight'),
    },

    // specify the number of points to draw
    count: numPoints,

    // specify that each vertex is a point (not part of a mesh)
    primitive: 'points',
  });
  
  return (
    <div>
      <ReglFrame height={1000} width={1000}
        onFrame={(context, regl) => {
          regl.clear({
            color: [0, 0, 0],
            depth:1
          })
          
        }
        }>
        <DrawPoints 
          uniforms={uniforms}
          points={pos}
          col={col}
          stageWidth={width}
          stageHeight={height} />
      </ReglFrame>
    </div>
  );
};

export default Example;