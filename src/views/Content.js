import React, {Component} from 'react';
import * as d3 from "d3";
import * as regl from 'regl';
import Example1 from './Example1.js';
import Example2 from './Example2.js';
import Example3 from './Example3.js';
import Example3a from './Example3a.js';
import Example3b from './Example3b.js';
import Example4 from './Example4.js';
import Example4a from './Example4a.js';
import Example5 from './Example5.js';
import Example5a from './Example5a.js';
import ExampleV from './ExampleV.js';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { prism } from 'react-syntax-highlighter/styles/prism';
import CodeDisplay from '../code/CodeDisplay.js';
export default class Content extends Component {
   constructor(props){
     super(props);  
   }
    render() {
      return (
        <div className="w3-main" style={{marginLeft: '250px'}}>
         
           <div className="w3-row w3-padding-64" id="What_is_regl">
             <div className="w3-twothird w3-container">
               <h1 className="w3-text-teal">What is regl?</h1>
               <p>
                 regl is a wrapper for WebGL that tries to remove as much shared state as possible by abstracting parts of the graphics pipeline process and integrating it with functional JavaScript. Let’s remember that WebGL is the JavaScript API for rendering graphics as part of a web page canvas executed on the computer’s GPU. WeBGL is written with control code in JavaScript and Shader code in GLSL (OpenGL Shading Language). 
                 <br />
                 regl replaces the WebGL API with two fundamental abstractions:
                 <br />
                 <ul>
                   <li> <b>Resources</b>: which are used to handle GPU objects like textures, FBOs or buffers.</li>
                   <li> <b>Commands</b>: which are used to represent a complete WebGL state required to perform a draw call.</li>
                 </ul>
                 In the end regl has the same capabilities as WebGL with less overhead and easier debugging. The values emphasized by the <a href="https://github.com/regl-project/regl" target="_blank">developers (and quoted from them)</a> are:
                 <ul>
                    <li><b>Simplicity</b>: The interface is concise and emphasizes separation of concerns. Removing shared state helps localize the effects and interactions of code, making it easier to reason about. </li>
                    <li><b>Correctness</b>: regl has more than 30,000 unit tests and above 95% code coverage. In development mode, regl performs strong validation and sanity checks on all input data to help you catch errors faster.</li>
                    <li><b>Performance</b>: regl uses dynamic code generation and partial evaluation to remove almost all overhead.</li>
                    <li><b>Minimalism</b>: regl just wraps WebGL. It is not a game engine and doesn't have opinions about scene graphs or vector math libraries. Any feature in WebGL is accessible, including advanced extensions like multiple render targets or instancing.</li>
                    <li><b>Stability</b>: regl takes interface compatibility and semantic versioning seriously, making it well suited for long lived applications that must be supported for months or years down the road. It also has no dependencies limiting exposure to risky or unplanned updates.</li>
                  </ul>
                  The first example illustrates how to render an animation of the Mandelbrot Set using regl in a really compact way. The demo is made by <a href="https://codepen.io/thepheer/" target="_blank">thepheer</a> and is available at <a href="https://codepen.io/thepheer/pen/mqGZPEcodepen" target="_blank">codepen</a>. This example is being rendered on your browser using your GPU! You can inspect it to check that it is not a .gif : ) <br />
                  Besides the official <a href = "https://github.com/regl-project/regl/blob/gh-pages/API.md" target = "_blank">documentation</a> and the official <a href="https://regl-project.github.io/regl/www/gallery.html" target="_blank">examples</a>, I recommend checking out the amazing tutorials: 
                  <ul>
                    <li> <a href="http://vallandingham.me/regl_intro.html"  target="_blank">Jim Vallandingham - An Intro to regl for Data Visualization</a> </li>
                    <li> <a href="https://peterbeshai.com/beautifully-animate-points-with-webgl-and-regl.html" target="_blank">Peter Beshai - Beautifully Animate Points with WebGL and regl</a> </li>
                  </ul>
               </p>
             </div>
             <div className="w3-third w3-container">
               <div className="w3-border w3-padding-large w3-padding-64 w3-center">
                    <Example1 />
                    <p>Mandelbrot set animation</p>
               </div>
             </div>
           </div>
         
           <div className="w3-row w3-padding-64" id="Installation_and_Initialization">
             <div className="w3-twothird w3-container">
               <h1 className="w3-text-teal">Installation and Initialization</h1>
               <p>The easiest way to install is using npm, just run the command: <br />
                <SyntaxHighlighter language='bash' style={prism}>{"npm i -S regl"}</SyntaxHighlighter>
                  It's also possible to use it as a standalone script however check <a href="https://github.com/regl-project/regl" target="_blank">the developer's page</a> for some nuisances in doing this: <br/>
                  <SyntaxHighlighter language='html' style={prism}>{"<script language=\"javascript\" src=\"https://npmcdn.com/regl/dist/regl.js\"></script>"}</SyntaxHighlighter>
                  In the first case we initialize the package using Node.js:
                  <SyntaxHighlighter language='javascript' style={prism}>{"var regl = require('regl')()"}</SyntaxHighlighter>
                  This will create a full screen canvas element which is usefull for quick demos. Notice the arguments are left blank, here we can inject the parameters to modify the rendering process. In particular we are interested in the following two examples:
                  <SyntaxHighlighter language='javascript' style={prism}>{"var regl = require('regl')({\n  container: element\n })"}</SyntaxHighlighter>
                  <SyntaxHighlighter language='javascript' style={prism}>{"var regl = require('regl')({\n  canvas: canvas\n })"}</SyntaxHighlighter>
                  In the first case regl will insert a canvas object as a child of the DOM element (it works great with {"<div>"}). In the second case regl will draw on the canvas specified by the parameter. Check the documentation to see which other parameters can be used to initialize regl (in particular it specifies how to add OpenGL extensions). Our code doesn't render anything on canvas so we draw a triangle to prove we can draw something, the building block of computer graphics.
               </p>
             </div>
             <div className="w3-third w3-container">
               <div className="w3-border w3-padding-large w3-padding-64 w3-center">
                    <Example2 />
                    <p>Look, a triangle drawn with regl</p>
               </div>
             </div>
           </div>
         
           <div className="w3-row w3-padding-64" id="The_basic_structure_of_a_command">
             <div className="w3-twothird w3-container">
               <h1 className="w3-text-teal">The basic structure of a command</h1>
               <p> There are two ways in which we can access the <a href ="https://hacks.mozilla.org/2013/04/the-concepts-of-webgl/" target="_blank">OpenGL pipeline</a> modifying the parameters we’re going to draw:
                  <ol>
                    <li> <b>Vertex Shaders</b>:  which are responsible for taking the object that is being rendered (wherever it’s a point, a sphere, a triangle or a teacup) and determining the position in the <a href ="https://hacks.mozilla.org/2013/04/the-concepts-of-webgl/" target="_blank">WebGL space</a>. </li>
                    <li> <b>Fragment Shaders</b>: which are responsible for the visual display of the objects shown on screen. In particular they are responsible for choosing the color of each pixel. </li> 
                  </ol>
                  Every tutorial starts off by drawing a triangle, and so we will draw a quadrilateral (cause it's less mainstream): 
                  <SyntaxHighlighter language='javascript' style={prism}>{CodeDisplay.code1()}</SyntaxHighlighter>
                  drawQuadilateral is an example of a command created using regl, one of the building blocks of the whole API. Let’s analyze all of the parameters we used (which are not all you can use, check the <a href = "https://github.com/regl-project/regl/blob/gh-pages/API.md" target = "_blank">documentation</a>):
                  <ul>
                    <li><b>frag</b>: The fragment shader code written in GLSL, note that this is passed as a string using the <a href="https://en.wikipedia.org/wiki/Grave_accent" target="_blank">grave accent symbol</a> (which I recently found out where it is in my keyboard)</li>
                    <li><b>vert</b>: The vertex shader code written, which is also handled like the fragment shader </li>
                    <li><b>attributes</b>: The attributes that will be consumed individually for each object being rendered. Note that in normal GLSL we would have to pass this as a one dimensional array, however regl is smart enough to handle this. The attributes can also be specified by functions and this will prove to be fundamental later on.</li>
                    <li><b>uniforms</b>: The values that are uniform for each object being rendered. In this case the colors are always the same, so we supply it as a uniform and not an attribute. Similar to the attributes, it is possible to supply the uniforms as functions. </li>
                    <li><b>count</b>: This simply specifies how many objects we are going to draw.</li>
                    <li><b>primitive</b>: The primitive type of object we are going to draw, this can be points, lines or triangles. The rules of how to interpret the input data for triangles and lines are also specified in the primitive, look up this <a href="http://www.informit.com/articles/article.aspx?p=2111395&seqNum=2" target="_blank">nice reference</a> to understand how these primitive vary the way triangles are drawn, note that this is standard for all OpenGL/WebGL. </li>
                  </ul>
                  As of now the vertex and fragment shaders are very simple. Every variable with the prefix ‘gl_’ represents information useful for WebGL such as the position and color. Notice that the color is represented by a vector with four entries, this corresponds to the RGBa notation, where the last value is the opacity of the color. What may be more interesting, the position is also a vector with four entries, the first three entries represent the x,y,z coordinates, whereas the fourth entry represents the homogenous coordinate. The homogenous coordinate, noted as w, is a very interesting and useful concept when it comes to rendering a 3D scene, if you are not sure what it does just leave it at 1. 
                  A great description can be found <a href="https://www.tomdalling.com/blog/modern-opengl/explaining-homogenous-coordinates-and-projective-geometry/" target="_blank">here</a> and a great math-oriented explaination is also found in <a href="https://en.wikipedia.org/wiki/Homogeneous_coordinates" target="_blank">Wikipedia</a>. In the next section we will write more complex shaders.
                 </p>
             </div>
             <div className="w3-third w3-container">
               <div className="w3-border w3-padding-large w3-padding-64 w3-center">
                  <Example3 /> 
                  <p> A hipster quadrilateral with 'triangle fan' primitive </p>
               </div>
               <div className="w3-border w3-padding-large w3-padding-64 w3-center">
                  <Example3a /> 
                  <p> A hipster quadrilateral with 'triangle strip' primitive (not exactly a quadrilateral, or a convex polygon for that matter) </p>
               </div>
               <div className="w3-border w3-padding-large w3-padding-64 w3-center">
                  <Example3b /> 
                  <p> A hipster quadrilateral with 'lines' primitive (so that's two lines) </p>
               </div>
             </div>
           </div>
           <div className="w3-row w3-padding-64" id="Shaders_and_inputs">
             <div className="w3-twothird w3-container">
               <h1 className="w3-text-teal">Shaders and inputs</h1>
               <p>
                  Now we proceed to write the shaders, remember that they are coded in GLSL, which may look familiar to C/C++. For every shader the main code that will be execute should be written in a ‘void main()’ function. As an example let’s try to draw 10,000 points distributed normally. We will ue <a href="https://github.com/d3/d3-random" target="_blank">d3’s randomNormal</a> function to generate these points (with a 0.2 variance, so that the odds of the points being too far away are extremely low). Then we will choose the color of the points based on the <a href="https://en.wikipedia.org/wiki/HSL_and_HSV" target="_blank">HSL color cylinder</a>, where the angle represents the hue and the distance from the center the saturation. <br />
                  To do this we need to understand the tree type of variables used in the shaders:
                  <ul>
                    <li><b>Uniforms</b> are accessible by both the vertex and fragment shader. Furthermore, they are constant through each frame rendered. Though they can also be functions, so we can change them for every frame. In our example we set the point width to be a uniform value, and then pass it as a property when calling the command, we will se how to do this in more detail in the next section.</li>
                    <li><b>Attributes</b> are only provided to the vertex shader. Furthermore, their value varies for each frame rendered. In our case we compute the position of each point outside the regl command and then pass it as a parameter in the declaration of the command. It could make more sense to write them on execution of the command and not in its declaration if we want to change the points over time, we will delve into this in the next section.</li>
                    <li><b>Varyings</b> are varialbes declared in the vertex shader and then shared to the fragment shader. In this case we compute the color that corrsponds to each point in the vertex shader and pass it as a parameter to the fragment shader which is responsible for drawing the color (try to think what's faster, to compute it for every vertex or for every fragment, then do the same mental experiment for a bigger point width or when rendering triangles).</li>
                  </ul>
                  <SyntaxHighlighter language='javascript' style={prism}>{CodeDisplay.code2()}</SyntaxHighlighter>
                  Note that we could change the primitive to 'triangles' to make a different image based on how the <a href="https://classes.soe.ucsc.edu/cmps160/Fall10/resources/barycentricInterpolation.pdf" target="_blank">barycentric interpolation</a> of colors is RGB-based, not HSV-based.
                  We also use a helper function to transform HSV to RGBa since GSL represents color through RGBa. It's programmed with GPU in mind, check out the <a href="https://stackoverflow.com/questions/15095909/from-rgb-to-hsv-in-opengl-glsl" target="_blank">discussion on Stackoverflow</a>
               </p>
             </div>
             <div className="w3-third w3-container">
               <div className="w3-border w3-padding-large w3-padding-64 w3-center">
                  <Example4 /> 
                  <p> Visual experiment with 10,000 dots. The data is randomly generated when loading the page, you can refresh it to check, but the law of big numbers says you won't be getting significantly different results.</p>
               </div>
             </div>
             <div className="w3-third w3-container">
               <div className="w3-border w3-padding-large w3-padding-64 w3-center">
                  <Example4a /> 
                  <p> Visual experiment wth 100,000 triangles with different opacities and interpolated colors from the color of their vertices. This should render pretty quickly on your computer, at least on mine it's lightning fast. Think how long it would take if we were doing it drawing in a canvas regularly. </p>
               </div>
             </div>
           </div>
           <div className="w3-row w3-padding-64" id="Passing_parameters_to_the_command">
             <div className="w3-twothird w3-container">
               <h1 className="w3-text-teal">Passing parameters to the command</h1>
               <p>
                  Now that we've analyzed how the shaders receive inputs let’s see where the regl commands can receive its inputs:<br />
                  <ul>
                    <li> <b>Context</b>: The amount of ticks passed since the beginning of the rendering process and the time in seconds that have passed are accessible through the context variables. This space is used to store information across commands, either by defining them yourself or using default regl values such as tick, time, pixel ratio or display width and height. In a classical analogy with ReactJS, the context work similarly to react’s context.</li>
                    <li> <b>Props</b>: The easiest way to pass data to a regl command is through props. These work exactly as props in ReactJS, they are passed within an object that runs the draw command.</li>
                    <li> <b>this</b>: You can also reference variables in a state within the command. This is analogous to the state variables in ReactJS.</li>
                  </ul>
                  You can access the props or context in a uniform or attribute through a function which receives the context as the first argument and the props as the second. You can also use regl.prop() to access a particular property. <br/>
                  This whole process is extremely important when it comes to animating stuff, since the position has to be dynamically calculated for each tick, but we don’t want to declare a new command for each tick. The recommended way to animate is using regl.frame(). Inside this call you should declare a function that receives the context and executes the commands you want to run. Let’s see this process by example, let’s say we want to animate the movement of a semi-random cloud of points.<br />
                  First we generate a random cloud of points around a circle:
                  <SyntaxHighlighter language='javascript' style={prism}>{CodeDisplay.code3a()}</SyntaxHighlighter>
                  Then we write the command that draws the points, notice that the command recieves the color and the point widt through the props. Also, notice how the attributes vary depending on the context.
                  <SyntaxHighlighter language='javascript' style={prism}>{CodeDisplay.code3b()}</SyntaxHighlighter>
                  At last, we draw the frame loop that changes the color and the pixel width depending on how time has passed. The color is changed every time the points are very close to the center of the canvas and after at least two seconds have passed.
                  <SyntaxHighlighter language='javascript' style={prism}>{CodeDisplay.code3c()}</SyntaxHighlighter>
               </p>
             </div>
             <div className="w3-third w3-container">
               <div className="w3-border w3-padding-large w3-padding-64 w3-center">
                  <Example5 /> 
                  <p> Animation with 500 points</p>
               </div>
             </div>
             <div className="w3-third w3-container">
               <div className="w3-border w3-padding-large w3-padding-64 w3-center">
                  <Example5a /> 
                  <p> Animation with 10,000 points and a smaller point width</p>
               </div>
             </div>
           </div>
           <div className="w3-row w3-padding-64" id="One_final_example">
             <div className="w3-twothird w3-container">
               <h1 className="w3-text-teal" >One final example</h1>
               <p>
                  I made a video tutorial if you wanna check it out: <br />
                  <iframe  id="ytplayer" type="text/html" width="640" height="360"
                    src="https://www.youtube.com/embed/SVYmYL3Mah4">
                  </iframe> <br />
                  The code for the final version is:
                  <SyntaxHighlighter language='javascript' style={prism}>{CodeDisplay.code4()}</SyntaxHighlighter>
               </p>
             </div>
             <div className="w3-third w3-container">
               <div className="w3-border w3-padding-large w3-padding-64 w3-center">
                  <ExampleV /> 
                  <p> Rendering animation made in the tutorial</p>
               </div>
             </div>
           </div>
           
           <footer id="myFooter">
            <div className="w3-container w3-theme-l2 w3-padding-32">
              <h4>Made by <a href="https://github.com/rjmantilla76" target="_blank">@rjmantilla76</a> for <a href="https://uniandes.edu.co/en" target="_blank">Uniandes'</a> fall of 2017 course <a href="http://johnguerra.co/classes/webDevelopment_fall_2017/" target="_blank">Web Development</a></h4>
            </div>
        
            <div className="w3-container w3-theme-l1">
              <p>Style powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p>
            </div>
          </footer>
        </div>
      );
    }  
  }