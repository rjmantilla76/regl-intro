import React, {Component} from 'react';
import * as d3 from "d3";
import {mat2,vec2} from 'gl-matrix';
export default class Example5a extends Component {
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

    //We generate points randomly close to a circle of radius 0.6 with these functions
    const numPoints = 10000;

    const rngNormal =  d3.randomNormal(0,0.04);
    const rngUniform = d3.randomUniform(0,2*Math.PI);

    const initialPosition = d3.range(numPoints).map(i =>{
      let angle = rngUniform();
      return {
        x: rngNormal()+Math.sin(angle)*0.6,
        y: rngNormal()+Math.cos(angle)*0.6
      };
    });
    const drawPoints = regl({
      frag: `
      precision highp float;
      uniform vec3 color;
      void main() {
        gl_FragColor = vec4(color, 1);
      }
      `,
      vert: `
      precision highp float;
      attribute vec2 position;
      uniform float pointWidth;
      void main() {
        // update the size of a point based on the prop pointWidth
        gl_PointSize = pointWidth;
  
        gl_Position = vec4(position, 0.0, 1.0);
      }
      `,
      attributes: {
        //We vary the position depending on the amount of frames that have passed
        position: (context, props)=> {
          return initialPosition.map(d => [d.x* Math.cos(context.tick/100), d.y* Math.cos(context.tick/100)]);
        },
      },
      uniforms: {
        //We will recieve the pointWidth and the color as a parameter for the command
        pointWidth: regl.prop('pointWidth'),
        color: regl.prop('color')
      },
      count: initialPosition.length,
      primitive: 'points'
    });
    let currentColor=[1,0,0];
    let lastChangeColorTime=0;
    // We iterate for each frame, the context is supplied by regl
    regl.frame( (context) => {
      // clear the background
      regl.clear({
        // background color (black)
        color: [0, 0, 0, 1],
        depth: 1,
      });
      // We vary the point width in the range [1,9] depending on the amount of frames that have passed
      drawPoints({
        pointWidth: 2*Math.cos(context.tick/50)+1,
        color: currentColor
      });
      //If we have had the same color for 2 seconds, and the points are very close to the origin, we change the color randomly
      if(context.time > lastChangeColorTime+2 &&  Math.abs(Math.cos(context.tick/100))<0.04){
        lastChangeColorTime = context.time;
        currentColor = [Math.random(),Math.random(),Math.random()];
      }
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