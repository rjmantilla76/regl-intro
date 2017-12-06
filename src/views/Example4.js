import React, {Component} from 'react';
import * as d3 from "d3";
export default class Example4 extends Component {
  constructor(props){
    super(props);
    this.forceUp = () => {this.resize(this.canvasFrame)};
  }
  resize(canvas) {
    // Lookup the size the browser is displaying the canvas.
    var displayWidth  = canvas.clientWidth;
    var displayHeight = canvas.clientHeight;
  
    // Check if the canvas is not the same size.
    if (canvas.width  != displayWidth ||
        canvas.height != displayHeight) {
  
      // Make the canvas the same size
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }
  }
  componentDidMount(){
    this.resize(this.canvasFrame);
    let regl = require('regl')({
        canvas: this.canvasFrame
    });
    const numPoints = 10000;
    const pointWidth = 2;
    const rng =  d3.randomNormal(0,0.2);
    const points = d3.range(numPoints).map(i => ({
      x: rng(),
      y: rng()
    }));
    const drawPoints = regl({
      frag: `
      precision highp float;

      varying vec3 fragColor;
  
      void main() {
        // gl_FragColor is a special variable that holds the color of a pixel
        gl_FragColor = vec4(fragColor, 1);
      }
      `,
  
      vert: `
      precision highp float;

      // per vertex attributes
      attribute vec2 position;
  
      // variables to send to the fragment shader
      varying vec3 fragColor;
      
      // values that are the same for all vertices
      uniform float pointWidth;
  
      // a helper function to turn HSV colors into RGB
      vec3 hsv2rgb(vec3 c)
      {
          vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
          vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
          return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      void main() {
        // update the size of a point based on the prop pointWidth
        gl_PointSize = pointWidth;
  
        // send color to the fragment shader
        // The H value is calculated based on the angle (as a challenge figure out how)
        // The S value depends on the distance from the center
        // The V value is always defaulted to 1
        fragColor = hsv2rgb(vec3((acos(-1.0) + atan(position.y,position.x))/(acos(-1.0)*2.0),1.0-length(position)/sqrt(2.0),1));
  
        // gl_Position is a special variable that holds the position of a vertex
        gl_Position = vec4(position, 0.0, 1.0);
      }
      `,
      attributes: {
        //The vertex shader will receive just the relevant value for a given point.
        position: points.map(d => [d.x, d.y]),
      },
      uniforms: {
        // by using `regl.prop` to pass these in, we can specify them as arguments
        // to our drawPoints function
        pointWidth: regl.prop('pointWidth'),
      },
      count: points.length,
      primitive: 'points'
    });
  
    // clear the background
    regl.clear({
      // background color (black)
      color: [0, 0, 0, 1],
      depth: 1,
    });

    // note that the arguments are available via `regl.prop`.
    drawPoints({
      pointWidth
    });
  }
  
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.forceUp);
  }
  render() {
    return (
      <canvas ref= {(canvas) => { this.canvasFrame = canvas; } } />

    );
  }  
}