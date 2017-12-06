import React, {Component} from 'react';
import * as d3 from "d3";
import {mat2,vec2} from 'gl-matrix';
export default class Example3b extends Component {
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
    const drawQuadrilateral = regl({
        
        frag: `
        precision mediump float;
        uniform vec4 color;
        void main () {
            gl_FragColor = color;
        }`,

        vert: `
        precision mediump float;
        attribute vec2 position;
        void main () {
            gl_Position = vec4(position, 0, 1);
        }`,
    
        attributes: {
            position: [
            [-1, -1],
            [0.5, -0.6],
            [1, 1],
            [-0.5, 0]
            ]
        },
    
        uniforms: {
            color: [177/255, 61/255, 20/255, 1]
        },
    
        count: 4,
        primitive: 'lines'
        });
    regl.frame(drawQuadrilateral);
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