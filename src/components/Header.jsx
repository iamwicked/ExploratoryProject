import React, { useEffect, useState } from 'react'
import '../App.css'

let v1=0;
let v2=0;
let v3=0;
var x = 1;
function Header(props){
    const [Fsyn1,SetFsyn1]=useState(0);
    const [Fack1,SetFack1]=useState(0);
    const [Ffin1,SetFfin1]=useState(0);
    const [Fsyn2,setFsyn2]=useState(0);
    const [Fack2,setFack2]=useState(0);
    const [Ffin2,setFfin2]=useState(0);

    const [server_isn, SetServer_isn] = useState(0);
    const[client_isn, SetClient_isn] = useState(0);
    const [client_ack, SetClient_ack] = useState(0);
    const [server_ack, setServer_ack] = useState(false);
    const [segmentSize, SetSegmentSize] = useState(0);

    const [ip1,setip1]=useState("")
    const [ip2,setip2]=useState("")
    const [Ids, setIds] = useState([]);
    
    //functions to toggle flag bits
    const toggleFlagsSyn=()=>{
        SetFsyn1((flags)=>(flags+1)%2)
    }
    const toggleFlagsAck=()=>{
        SetFack1((flags)=>(flags+1)%2)
    }
    const toggleFlagsFin=()=>{
        SetFfin1((flags)=>(flags+1)%2)
    }

    {Ids.map((id) => (
        document.getElementById(`${id}`).style.backgroundColor="#32de84"
        
      ))}

    

    //handling send syn button
    const handleSend=(e)=>{
        e.preventDefault();
        console.log(v1);
        //if the right flags are true
        
        if(Fsyn1===1 && Fack1===0 &&v1===0){
            v2=1;
            props.setText([...props.text, `Syn Packet sent with client_isn = ${client_isn}`]);
            setTimeout(()=>{
                props.setText2([...props.text2,`Syn Packet successfully received with Sequence Number ${parseInt(client_isn)+1-1}`]);
                setFsyn2(1);    //setting server syn bit to 1
                setFack2(1);    //setting server ack bit to 1
    
                setServer_ack(parseInt(client_isn)+1);
    
            },2000)
            setTimeout(()=>{
                const server_isn = Math.floor(Math.random() * 1000);  //randomly assigning server initial sequence number
                SetServer_isn(server_isn);
                props.setText2([...props.text2, `Sending SynAck Packet with server_isn = ${server_isn}  and acknowledgment number = ${parseInt(client_isn)+1}`]);
            },4000)
            setTimeout(()=>{
                console.log(props.text2)
                props.setText([...props.text, `SynAck Packet Succesfully received`]);
                v1=1;
            },6000)

    } 
        //checking condition for the proper Ack packet
        if(Fsyn1===0 && Fack1===1 && parseInt(client_ack)=== server_isn+1 && parseInt(client_isn)===server_ack && v2===1){
            props.setText([...props.text,`Ack Packet Sent`]);
            setTimeout(()=>{
                props.setText2([...props.text2,`Ack packet succesfully received`]);
                setFsyn2(0);

            },2000)

            setTimeout(()=>{
                alert("Connection Established")
                props.setFlag(1);
                props.setConnectionStatus("Established")
                setServer_ack(param=> param+1 );
                SetServer_isn(param=>param+1);
                v2=0;
                v3=1;
                setFsyn2(0);
                
            },3000)
        } 

        if(Fsyn1===0 && Fack1===1 &&Ffin1===0 && parseInt(client_ack)=== server_isn+1 && parseInt(client_isn)===server_ack && v3===1){
            props.setText([...props.text,`Packet Successfully Sent`]);
            v2=0;
            v1=1;
            setTimeout(()=>{
                props.setText2([...props.text2,`Packet Succesfully Received by server`]);
                setServer_ack(param=> param+1 );
                SetServer_isn(param => param+1);
            },2000)

            setTimeout(()=>{
                props.setText2([...props.text2,`Sending Acknowledgement Packet`]);
            },4000)

            setTimeout(()=>{
                props.setText([...props.text,`Acknowledgement Succesfully Received by client`]);

                setIds([...Ids, x ]);
                
                x++;
                if(Number.parseInt(getComputedStyle(document.getElementById("test")).getPropertyValue('left'))<=1000)
                {
                    document.getElementById("test").style.left=`${Number.parseInt(getComputedStyle(document.getElementById("test")).getPropertyValue('left'))+45}px`
                }

            },6000)        
        } 

        if (props.connectionStatus === "Established" && Ffin1 ===1) {
            setFfin2(1);
            props.setText([...props.text,`Closing request initiated by client`]);
            props.setConnectionStatus("FIN_WAIT_1");
            props.setText([...props.text,`Sending Closing request to server with client_isn ${client_isn}`]);

            setTimeout(()=>{
                props.setText2([...props.text2,`Closing request succesfully received by server`]);
            },4000)
            setTimeout(()=>{
                props.setText2([...props.text2,`Sending acknowledgement packet to client with Acknowledgment number = ${server_ack}`]);
            },8000)

            setTimeout(()=>{
                props.setText([...props.text,`Acknowledgment packet succesfully received`])
                props.setText([...props.text,`Entering FIN_WAIT_2 State`])
                props.setConnectionStatus("FIN_WAIT_2");
            },12000);

            setTimeout(()=>{
                props.setText2([...props.text2,`Sending Packet with sequence number = ${server_isn}`])
            },16000);

            setTimeout(()=>{
                props.setText([...props.text,`Waiting for client to acknowledge the packet`])
            },20000)
        }

           
        if(Ffin2===1 && Ffin1===1 && parseInt(client_ack) ===server_isn+1 && props.connectionStatus === "FIN_WAIT_2"){
            props.setText([...props.text,`Acknowledgement Packet Successfully sent with Ack no. = ${server_isn+1}`])
            setTimeout(()=>{
                props.setText2([...props.text2,`Acknowledgement Packet successfully received`]);
            },3000)
            setTimeout(()=>{
                props.setText2([...props.text2,`Connection closing request authorized`]);
                props.setConnectionStatus("Closed");
                props.setFlag(0);
                alert("Connection Closed")
            },4000)
        }
    }

    
//function to handle client acknowledgement number from user
function HandleAck(event){
        SetClient_ack(event.target.value)
}
//functions to handle client Sequence number from user
function HandleSyn(event){
    SetClient_isn(event.target.value)
}
//Function to handle client data size entered by user
function HandleData(event){
        props.setDataSize(event.target.value)
}
function HandleSegment(event){
    props.setSegmentSize(event.target.value)
}


//assigning random ips to source and destination addresses
useEffect(()=>{
    setip1((Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+ ":"+(Math.floor(Math.random() * 1023)));
    setip2((Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+ ":"+(Math.floor(Math.random() * 1023)));
},[])

    return(

    <div>
        {/* <div className=" w-[15vw] h-[7vh] absolute left-[25vw] top-[0vh] p-4">
      <div>Window Size:</div>
      <input type="text" onChange={HandleData}></input>
      </div> */}
        <div className="bg-slate-50 divide-y divide-slate-700 border-black border-2 h-[41vh] w-[22vw]" >

            <div className="bg-lime-200 flex p-1" > 
             <div className="mr-1">Source IP: </div>
             <div className="mr-1">{ip1} </div>
            </div>

            <div className="flex p-1" > 
             <div className="mr-1">SEQ Number:  </div>
             <input placeholder="0"  onChange={HandleSyn} type="text" id="small-input" class="mx-1 my-1 block w-full h-[40px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-200 "/>           
            </div>

            <div className="flex p-1" > 
             <div className="mr-1">ACK Number: </div>
             <input onChange={HandleAck} type="text" id="small-input" class="mx-1 my-1 block w-full h-[40px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-200 "/>           
            </div>
            <div className="flex p-1" > 
             <div className="mr-1">Segment Size: </div>
             <input placeholder="0"  onChange={HandleData} type="text" id="small-input" class="mx-1 my-1 block w-full h-[40px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-200 "/>           
            </div>
            <div className="flex p-1 grid-cols-3 gap-10" > 
             <div className="mr-1">SYN: </div>
             <div className=" hover:bg-blue-200"> {Fsyn1}</div>
             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-1 rounded-full" onClick={toggleFlagsSyn}>tog</button>

            </div>
            <div className="flex p-1 grid-cols-3 gap-10" > 
             <div className="mr-1">ACK: </div>
             <div className=" hover:bg-blue-200"> {Fack1}</div>
             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-1 rounded-full" onClick={toggleFlagsAck}>tog</button>

            </div>
            <div className="flex p-1 grid-cols-3 gap-10" > 
             <div className="mr-1">FIN: </div>
             <div className=" hover:bg-blue-200"> {Ffin1}</div>
             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-1 rounded-full" onClick={toggleFlagsFin}>tog</button>
            
             <div className="absolute left-[2vw] top-[42vh]">Client Segment Header</div>

            </div>
        </div>

        <div>
            <button onClick={handleSend} className="w-[10vw] h-[8vh] absolute bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded shadow-lg left-[26vw] top-[15vh]">Send Packet</button> 
        
        </div>
    
        <div className="bg-slate-50 divide-y divide-slate-700 border-2 inline-block absolute left-[40vw] top-[0vh] border-black h-[30vh] w-[22vw]"  >

        <div className="bg-red-200 flex p-1" > 
        <div className="mr-1">Destination IP: </div>
        <div className="mr-1">{ip2} </div>
        </div>

        <div className="flex p-1" > 
         <div className="mr-1">Seq Number: </div>
         <div className="mr-1"> {server_isn}</div>
        </div>

        <div className="flex p-1" > 
         <div className="mr-1">ACK Number: </div>
         <div className="mr-1">{server_ack}  </div>
        </div>

        <div className="flex p-1" > 
         <div className="mr-1">Segment Size: </div>
         <div className="mr-1">{props.dataSize}  </div>
        </div>

        <div className="flex p-1 grid-cols-3 gap-10" > 
         <div className="mr-1">SYN: {Fsyn2}</div>
         <div className=" hover:bg-blue-200"> </div>
        </div>

        <div className="flex p-1 grid-cols-3 gap-10" > 
         <div className="mr-1">ACK: {Fack2}</div>
         <div className=" hover:bg-blue-200"></div>
        </div>

        <div className="flex p-1 grid-cols-3 gap-10" > 
         <div className="mr-1">FIN: {Ffin2}</div>
         <div className=" hover:bg-blue-200"> </div>
        </div>

        <div className="absolute left-[5vw] top-[30vh]">Server Segment Header</div>
        
       </div>
    </div>
    )
}
export default Header