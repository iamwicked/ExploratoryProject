import React from 'react'
import '../App.css'




function Log(props){
    return(
    <div className="overflow-y-auto mt-[2vh] w-[30vw] h-[43vh] justify-left border-[2px] ml-[5px] border-black inline-block bg-slate-50 ">
        <div className=" text-4xl font-black text-gray-900 dark:text-black mt-[1vh] text-center border-red flow-root">Client Log</div>
        <ul className = "divide-y divide-slate-400 text-[17px] leading-8 font-semibold text-gray-800  mt-[1vh] text-center p-4 text-base/6 ">{props.text.map((entry)=><div>{entry}</div>)}</ul>
      </div>
    )
};


export default Log