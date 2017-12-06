import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Content from './views/Content.js'
class App extends Component {
  
  constructor(props) {
    super(props);
    this.w3_open = this.w3_open.bind(this);
    this.w3_close = this.w3_close.bind(this);
  }
  w3_open() {
    if (this.mySidebar.style.display === 'block') {
        this.mySidebar.style.display = 'none';
        this.overlayBg.style.display = "none";
    } else {
        this.mySidebar.style.display = 'block';
        this.overlayBg.style.display = "block";
    }
  }

  // Close the sidebar with the close button
  w3_close() {
    this.mySidebar.style.display = "none";
    this.overlayBg.style.display = "none";
  }
  render() {
    return (
      <div className="App">
        <div className="w3-top">
          <div className="w3-bar w3-theme w3-top w3-left-align w3-large">
            <a className="w3-bar-item w3-button w3-right w3-hide-large w3-hover-white w3-large w3-theme-l1" href="javascript:void(0)" onClick={()=>{this.w3_open()}}><i className="fa fa-bars"></i></a>
            <a href="https://github.com/regl-project/regl" className="w3-bar-item w3-button w3-theme-l1">regl</a>
            <a href="https://github.com/regl-project/regl/blob/gh-pages/API.md" className="w3-bar-item w3-button w3-hide-small w3-hover-white">API Docs</a>
            <a href="https://regl-project.github.io/regl/www/gallery.html" className="w3-bar-item w3-button w3-hide-small w3-hover-white">Examples</a>
            <a href="http://regl.party/examples" className="w3-bar-item w3-button w3-hide-small w3-hover-white">Live Editor</a>
            <a href="https://github.com/rjmantilla76" className="w3-bar-item w3-button w3-hide-small w3-hover-white">My Github</a>
            <a href="http://johnguerra.co/" className="w3-bar-item w3-button w3-hide-small w3-hover-white">Webdev @ Uniandes</a>
          </div>
        </div>
        <nav className="w3-sidebar w3-bar-block w3-collapse w3-large w3-theme-l5 w3-animate-left" ref={(sidebar)=>{this.mySidebar = sidebar;}}>
          <a href="javascript:void(0)" onClick={()=>{this.w3_close()}} className="w3-right w3-xlarge w3-padding-large w3-hover-black w3-hide-large" title="Close Menu">
            <i className="fa fa-remove"></i>
          </a>
          <h4 className="w3-bar-item"><b>Menu</b></h4>
          <a className="w3-bar-item w3-button w3-hover-black" href="#What_is_regl">What is regl?</a>
          <a className="w3-bar-item w3-button w3-hover-black" href="#Installation_and_Initialization">Installation and Initialization</a>
          <a className="w3-bar-item w3-button w3-hover-black" href="#The_basic_structure_of_a_command">The basic structure of a command</a>
          <a className="w3-bar-item w3-button w3-hover-black" href="#Shaders_and_inputs">Shaders and inputs</a>
          <a className="w3-bar-item w3-button w3-hover-black" href="#Passing_parameters_to_the_command">Passing parameters to the command</a>
          <a className="w3-bar-item w3-button w3-hover-black" href="#One_final_example">One final example</a>
        </nav>
        <div className="w3-overlay w3-hide-large" onClick={()=>{this.w3_close()}} style={{cursor: 'pointer'}} title="close side menu" ref={(overlay)=>{this.overlayBg = overlay;}}></div>
        <Content />
        
  
      </div>
    );
  }
}

export default App;
