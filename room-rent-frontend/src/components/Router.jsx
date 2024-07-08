import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import RoomPostsList from "./RoomPostsList";
import RoomPostDetails from "./RoomPostDetails";
import { LoginPage } from "./LoginPage";


const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Root/>,
            children: [
                {
                    path: '/',
                    element: <RoomPostsList/>,
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
                }
            ]
        }
    ]
)

export default router

// localhost:8080/room-posts?minPrice=1000&location=Orchard&stationName=Orchard