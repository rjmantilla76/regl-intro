import React, {Component} from 'react';
import * as d3 from "d3";
export default class ExampleV extends Component {
  generateInput(){
    const rng = d3.randomUniform(-1,1);
    const rng2 = d3.randomUniform(0.1,4);
    let dots = d3.range(100).map(()=>{
      let val1 = rng();
      let val2 = rng();
      let value = [];
      for (let i = -1; i<val2; i+=5e-3){
        value.push({x:val1, y:i, 
          color:{r: (val1+1)/2,g:(1-val1)/2,b:0},
          st: rng2()});
      }
      return value;
    });
    dots=[].concat.apply([],dots);    
    return dots;
  }
  componentDidMount(){
    const regl = require('regl')({
      container: this.drawElement
    })
    const dots = this.generateInput();
   

    const drawCommand = regl({
      frag:`
        precision mediump float;
        varying vec4 fragColor;
        void main(){
          gl_FragColor = fragColor;
        }
      `,
      vert:`
        precision mediump float;
        attribute vec2 point;
        attribute vec3 color;
        varying vec4 fragColor;
        uniform float pointSize;
        void main(){
          fragColor = vec4(color.x, color.y, (1.0-point.y)/2.0,1);
          gl_PointSize = pointSize;
          
          gl_Position = vec4(point.x,point.y,0,1); 
        }
      `,
      attributes: {
        point: (context,props) =>{ 
          return dots.map((d)=>{
            if (context.time%10> d.st && context.time%10<d.st+props.speed){
              return [d.x*(context.time%10 - d.st)/props.speed - 1*(1-((context.time%10 - d.st)/props.speed)),d.y];
            } else if(context.time%10 < d.st){
              return [-1,d.y];
            } else {
              return [d.x,d.y];
            }
          });
        },
        color: dots.map((d)=>([d.color.r, d.color.g, d.color.b]))
      },
      uniforms: {
        pointSize: 1.0
      },
      count: dots.length,
      primitive: 'points'
    });
    regl.frame(()=>{
      regl.clear({
        color:[0,0,0,1]
      });
      drawCommand({
        speed: 1.5
      });
    });
    
  }
  render() {
    return (
      <div ref= {(element) => { this.drawElement = element; } } />

    );
  }  
}