import React from 'react'
import '../App.css'

function Client(props){
    return(
        <div className={`border-2 border-red-300 client bg-red-100 ${props.flag ? "border-green-500 shadow-2xl shadow-red-500/100 ...": ""}`}> 
            Client
        </div>
    )
}

export default Client
