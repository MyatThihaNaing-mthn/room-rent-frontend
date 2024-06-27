import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import RoomPostsList from "./RoomPostsList";
import RoomPostDetails from "./RoomPostDetails";


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
                    path: '/room-post/:id',
                    element: <RoomPostDetails/>
                }
            ]
        }
    ]
)

export default router