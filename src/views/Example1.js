import React, {Component} from 'react';
import * as d3 from "d3";
import {mat2,vec2} from 'gl-matrix';
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
    const draw = regl({
        frag: `
          precision highp float;
          float mandelbrot(vec2 z, vec2 c) {
            for(float i = 0.0; i < 1e3; i++) {
              float xx = z.x*z.x, yy = z.y*z.y, zz = xx + yy;
              if(zz > 256.0) return i - log2(log2(zz)) + 4.0;
              z = vec2(xx - yy, z.x*z.y*2.0) + c;
            }
          }
          
          uniform vec2 c;
          varying vec2 z;
          void main() {
            float m = mandelbrot(z, c);
            vec3 rgb = 0.5 + 0.5*cos(3.0 + 0.15*m + vec3(0.0, 0.6, 1.0));
            gl_FragColor = vec4(rgb, 1.0);
          }
        `,
        vert: `
          attribute vec2 position;
          uniform mat2 transform;
          varying vec2 z;
          void main() {
            z = transform * position;
            gl_Position = vec4(position, 0.0, 1.0);
          }
        `,
        uniforms: {
          transform: ({ viewportWidth: w, viewportHeight: h }) => {
            
            return mat2.fromScaling([], [w/h, 1]);
          },
          c: ({ time: t }) => {
            const a = [-0.765, 0.153];
            const b = [Math.sin(t), Math.cos(t)];
            return vec2.scaleAndAdd([], a, b, 2e-2);
          }
        },
        attributes: {
          position: [1, 1, -1, 1, 1, -1, -1, -1]
        },  
        primitive: 'triangle strip',
        count: 4
      });
      window.addEventListener('resize', this.forceUp);
      regl.frame(draw);
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