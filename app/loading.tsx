"use client"


import {ClimbingBoxLoader} from "react-spinners"

function Loading() {
   
    return ( <div className="w-full h-[90vh] flex justify-center items-center">
        <ClimbingBoxLoader size={20} />
    </div> );
}

export default Loading;