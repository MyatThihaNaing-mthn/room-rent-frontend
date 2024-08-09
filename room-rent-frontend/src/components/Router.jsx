import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import RoomPostsList from "./RoomPostsList";
import {RoomPostDetails} from "./RoomPostDetails";
import { LoginPage } from "./LoginPage";
import AgentRegister from "./agent/AgentRegister";
import Home from "./Home";
import AgentRoomPostDetails from "./AgentRoomPostDetails";
import RoomPostRegister from "./agent/RoomPostRegister";
import RoomPostEdit from "./agent/RoomPostEdit";


const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Root/>,
            children: [
                {
                    path: '/',
                    element: <Home/>,
                    index: true
                },
                {
                    path: '/room-posts/:filter?',
                    element: <RoomPostsList/>,
                },
                {
                    path: '/room-post/:id',
                    element: <RoomPostDetails/>
                },
                {
                    path: '/login',
                    element: <LoginPage/>
                },
                {
                    path: '/agent/register',
                    element: <AgentRegister/>
                },
                {
                    path: '/agent/room-post/:id',
                    element: <AgentRoomPostDetails/>
                },
                {
                    path: '/agent/room-post/register',
                    element: <RoomPostRegister/>
                },
                {
                    path: '/agent/room-post/edit/:id',
                    element: <RoomPostEdit/>
                }
            ]
        }
    ]
)

export default router

// localhost:8080/room-posts?minPrice=1000&location=Orchard&stationName=Orchard