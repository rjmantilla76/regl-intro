import React, {Component} from 'react';
import * as d3 from "d3";
export default class Example1 extends Component {
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
    const drawTriangle = regl({
        frag: `
        void main() {
          gl_FragColor = vec4(1, 0, 0, 1);
        }`,
      
        vert: `
        attribute vec2 position;
        void main() {
          gl_Position = vec4(position, 0, 1);
        }`,
      
        attributes: {
          position: [[0, -1], [-1, 0], [1, 1]]
        },
      
        count: 3,
        primitive: 'line loop'  
      });
    regl.frame(drawTriangle);
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