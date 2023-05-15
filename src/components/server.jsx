import React from 'react'
import '../App.css'

function Server(props){
    return(
        <div className={`border-2 border-lime-300 client bg-lime-100 ${props.flag ? " shadow-2xl shadow-lime-500/100 ...": ""}`}> 
            Server
        </div>
    )
}
export default Server
