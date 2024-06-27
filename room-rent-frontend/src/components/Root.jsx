import { Outlet } from "react-router-dom"

function Root(){
    return(
        <div className=" h-full w-full">
            NavBar here
            <Outlet/>
        </div>
    )
}


export default Root