import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

function Root(){

    return(
        <div className=" h-full w-full">
            <Navbar/>
            <Outlet/>
        </div>
    )
}


export default Root