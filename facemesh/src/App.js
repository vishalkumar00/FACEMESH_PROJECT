//install dependencies. done 
//import dependencies. done
// set up webcam and canvas. done
//load facemesh model. done

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

  // load facemesh model

  //Why async? Because loading a neural network takes time. It downloads model weights (basically learned numbers) from the internet.
  const runFacemesh = async ()=>{
    // facemesh.load()
// This loads the pretrained FaceMesh neural network into memory.

// await means:
//“Pause this function until the model finishes loading.”

//Without await, JavaScript would move on immediately before the model is ready.
    const net = await facemesh.load({

      // inputResolution

// This tells the model what size image it should process.

// Why does that matter?

// Neural networks don’t see pixels like humans. They see matrices.
// Bigger image → more pixels → more math → slower.

// So:

// 900x600 → detailed but heavier computation

// Smaller resolution → faster but less precise

// You’re basically deciding:
// “Do I want sharper detection or better performance?”
//       inputResolution:{width:900,height:600},
      scale:0.8

// scale: 0.8

// This rescales the input before processing.

// If scale = 1
// → uses full resolution

// If scale = 0.5
// → processes half-size image (faster, less accurate)

// Scale 0.8 means:
// “Shrink the image slightly to speed things up while keeping decent accuracy.”

// It’s a performance dial.
    })

  }

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
