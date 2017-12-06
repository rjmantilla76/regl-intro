

export default class CodeDisplay {
  static code1(){
    return `const drawQuadrilateral = regl({
  
  frag: \`
  precision mediump float;
  uniform vec4 color;
  void main () {
      gl_FragColor = color;
  }\`,

  vert: \`
  precision mediump float;
  attribute vec2 position;
  void main () {
      gl_Position = vec4(position, 0, 1);
  }\`,

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
  primitive: 'triangle fan'
  });
drawQuadrilateral();`;
  }
  static code2(){
    return `const numPoints = 10000;
const pointWidth = 2;
const rng =  d3.randomNormal(0,0.2);
const points = d3.range(numPoints).map(i => ({
  x: rng(),
  y: rng()
}));
const drawPoints = regl({
  frag: \`
  precision highp float;

  varying vec3 fragColor;

  void main() {
    // gl_FragColor is a special variable that holds the color of a pixel
    gl_FragColor = vec4(fragColor, 1);
  }
  \`,

  vert: \`
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
  \`,
  attributes: {
    //The vertex shader will receive just the relevant value for a given point.
    position: points.map(d => [d.x, d.y]),
  },
  uniforms: {
    // by using 'regl.prop' to pass these in, we can specify them as arguments
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

// note that the arguments are available via 'regl.prop'.
drawPoints({
  pointWidth
});

`;
  }
  static code3a(){
    return `//We generate points randomly close to a circle of radius 0.6 with these functions
const numPoints = 500;

const rngNormal =  d3.randomNormal(0,0.04);
const rngUniform = d3.randomUniform(0,2*Math.PI);

const initialPosition = d3.range(numPoints).map(i =>{
  let angle = rngUniform();
  return {
    x: rngNormal()+Math.sin(angle)*0.6,
    y: rngNormal()+Math.cos(angle)*0.6
  };
});`;
}
static code3b(){
return `const drawPoints = regl({
  frag: \`
  precision highp float;
  uniform vec3 color;
  void main() {
    gl_FragColor = vec4(color, 1);
  }
  \`,
  vert: \`
  precision highp float;
  attribute vec2 position;
  uniform float pointWidth;
  void main() {
    // update the size of a point based on the prop pointWidth
    gl_PointSize = pointWidth;

    gl_Position = vec4(position, 0.0, 1.0);
  }
  \`,
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
});`;
}
static code3c(){
return `let currentColor=[1,0,0];
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
    pointWidth: 4*Math.cos(context.tick/50)+5,
    color: currentColor
  });
  //If we have had the same color for 2 seconds, and the points are very close to the origin, we change the color randomly
  if(context.time > lastChangeColorTime+2 &&  Math.abs(Math.cos(context.tick/100))<0.04){
    lastChangeColorTime = context.time;
    currentColor = [Math.random(),Math.random(),Math.random()];
  }
});`;
  }
  static code4(){
    return `import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3';
class App extends Component {
  generateInput(){
    const rng = d3.randomUniform(-1,1);
    const rng2 = d3.randomUniform(0.1,7);
    let dots = d3.range(200).map(()=>{
      let val1 = rng();
      let val2 = rng();
      let value = [];
      for (let i = -1; i<val2; i+=1e-2){
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
      container: this.elem
    })
    const dots = this.generateInput();
    

    const drawCommand = regl({
      frag:\`
        precision mediump float;
        varying vec4 fragColor;
        void main(){
          gl_FragColor = fragColor;
        }
      \`,
      vert:\`
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
      \`,
      attributes: {
        point: (context,props) =>{ 
          return dots.map((d)=>{
            if (context.time> d.st && context.time<d.st+props.speed){
              return [d.x*(context.time - d.st)/props.speed - 1*(1-((context.time - d.st)/props.speed)),d.y];
            } else if(context.time < d.st){
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
        speed: 3
      });
    });
    
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div ref={(elem)=>this.elem=elem}> 
        </div>
      </div>
    );
  }
}

export default App;`;
  }
  
}