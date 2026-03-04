//install dependencies. done 
//import dependencies. done
// set up webcam and canvas. done
//load facemesh model. done

import logo from './logo.svg';
import './App.css';
import React,{useEffect, useRef} from 'react';
// this will allow us to use the webcam and ref to access the webcam stream
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';
import Webcam from 'react-webcam';
import { drawPoints } from './utilites';


function App() {
  // set up webcam and canvas refs
  const webcamRef =useRef(null);
  const canvasRef = useRef(null);

  useEffect(()=>{
  // load facemesh model
  const runFacemesh = async ()=>{

    // facemesh.load()
// This loads the pretrained FaceMesh neural network into memory.
    const net = await facemesh.load({
      // inputResolution This tells the model what size image it should process.
      inputResolution:{width:900,height:600},
   scale:0.8

// scale: 0.8
// This rescales the input before processing.

    });
    setInterval(()=>{
      detect(net)},100);

  }

  // detect face landmarks function 

  const detect = async(net)=>{

// reference to the actual webcam component in the DOM

// When React creates the webcam component, useRef stores it in current.

    if(typeof webcamRef.current!=="undefined"
      &&webcamRef.current!== null&&  // ensure the webcam object is not null  Even if it exists, it might still be empty.
      webcamRef.current.video.readyState===4 )//This checks if the video stream is fully loaded and ready.){
{
// now after all video check is we have to set some video and canvas properties like width and height
//make detections and draw them on the canvas

//1. get video properties
const  video = webcamRef.current.video;
const videoWidth =  webcamRef.current.video.videoWidth;
const videoHeight = webcamRef.current.video.videoHeight;

//2.set video width and height
webcamRef.current.video.width = videoWidth;
webcamRef.current.video.height = videoHeight;

//3, set canvas width and height 
canvasRef.current.width =  videoWidth;
canvasRef.current.height = videoHeight;

//4. make detections
 const face = await net.estimateFaces(video);
 drawPoints(face,canvasRef.current.getContext("2d"));
 console.log(face);


}
      }
    
  
runFacemesh();
},[]);
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
