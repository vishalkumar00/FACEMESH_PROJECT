//install dependencies. done 
//import dependencies. done
// set up webcam and canvas. done

import logo from './logo.svg';
import './App.css';
import React,{useRef} from 'react';
// this will allow us to use the webcam and ref to access the webcam stream
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';
import Webcam from 'react-webcam';


function App() {
  // set up webcam and canvas refs
  const webcamRef =useRef(null);
  const canvasRef = useRef(null);
  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            width: "900px",
    height: "600px",
    borderRadius: "30px",
    border: "6px solid #ff00cc",
    backgroundColor: "black",
    boxShadow: `
      0 0 20px #ff00cc,
      0 0 40px #ff00cc,
      0 0 20px #ffd000,
      0 0 60px #ffd000
    `,
    display: "block",
    margin: "auto",
    padding: "6px"
          }}>
        </Webcam>
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
   
    width: "900px",
    height: "600px",
    borderRadius: "30px",
    pointerEvents: "none",}}>
        </canvas>
      </header>
    </div>
  );
}

export default App;
