import './App.css'
import { BrowserRouter as Router, Routes,  Route, Redirect, Link} from "react-router-dom";
import React, { useState, Component } from 'react'
import Client from './components/client'
import Server from './components/server'
import Header from './components/Header'
import Log from './components/log'
import Status from './components/status'
import backgroundImage from "./white-waves.png"; 

function App() {

  const [text2, setText2] = useState([]);
  const [text,setText] = useState([]);
  const [flag,connectionFlag] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('Open');
  const [offset,setOffset]=useState("495px");
  const[dataSize,setDataSize] = useState("")

  var windowSize= `${parseInt(dataSize)*44.6}px`;

  return (


    <div style={{
        backgroundImage: `url(${backgroundImage})`, // set the background image
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh", // set a minimum height to the div element
      }}
      className="App relative">
      <div className="absolute text-4xl left-[40vw] top-[] font-bold text-stone-700" > TCP SIMULATOR</div>
      <div className="absolute top-[3vh]">
      <div className="border-dashed border-2 border-orange-200 w-[24vw] h-[8vh] bg-orange-100 absolute left-[74vw] top-[35vh] p-4">Current Connection Status: <span className="font-bold">{connectionStatus} </span></div>
     


        <div className="absolute top-[-4vh]">
        <div className={`border-2 border-indigo-700 w-[223px] h-[70px] absolute left-[${offset}] top-[265px]`}id="test"></div>
        
      <div className="flex flex-row gap-1 absolute top-[270px] left-[500px] " >
        <div className="p-4 w-[40px] text-black bg-stone-200" id="1">1</div>
        <div className="p-4 w-[40px] text-black bg-stone-200" id="2">2</div>
        <div className="p-4 w-[40px] text-black bg-stone-200" id="3">3</div>
        <div className="p-4 w-[40px] text-black bg-stone-200" id="4">4</div>
        <div className="p-4 w-[40px] text-black bg-stone-200" id="5">5</div>
        <div className="p-4 w-[40px] text-black bg-stone-200" id="6">6</div>
        <div className="p-4 w-[40px] text-black bg-stone-200" id="7">7</div>
        <div className="p-4 w-[40px] text-black bg-stone-200" id="8">8</div>
        <div className="p-4 w-[40px] text-black bg-stone-200" id="9">9</div>
        <div className="p-4 w-[40px] text-black bg-stone-200" id="10">10</div>
      </div>
      <div className="absolute left-[46vw] top-[45vh] w-[30vw]">Sliding Window</div>
      </div>
        <Log text={text}/>        {/* Updates Log Table*/}

        <Status text2={text2}/>   {/* Updates Log Table*/}

        {/*Visual Representation of Client Server Connection*/}
       <div className="w-[70vw] flex justify-right items-center inline-block  absolute left-[35vw] top-[4vh] ">
          <Client flag = {flag} />
           <div className={`w-[35vw] h-[2px] border-[2px] ${flag ? "border-green-200 shadow-xl shadow-indigo-200/40 ...": "border-dark-200"}`}> </div>
          <Server flag = {flag}/>
       </div>

      {/*Client and server Headers */}
       <div className="absolute left-[35vw] top-[50vh]">
          <Header dataSize={dataSize} setDataSize={setDataSize} setoffset={setOffset} offset={offset} connectionStatus={connectionStatus} setConnectionStatus={setConnectionStatus} text2 = {text2} setText2= {setText2} text={text} setText={setText} setFlag ={connectionFlag} />
       </div>
    

    {/* <div className="text-center absolute left-[57vw] top-[30vh] border-2 border-black w-[13vw] h-[100px]">
    <input type="text" class="left-[35vw] mx-2 my-1 block w-[11vw] h-[50px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-200 "/>           
    Window Size
    </div> */}
   </div>
    </div>


  );
}

export default App;

