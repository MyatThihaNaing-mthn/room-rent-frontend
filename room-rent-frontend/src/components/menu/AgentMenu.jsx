import { useNavigate } from "react-router-dom"

export default function AgentMenu({setMenuOpen}) {
    const navigate = useNavigate()

    const optionClickHandler = (url) => {
        setMenuOpen(false)
        navigate(url)
    }

    return (
        <div className=" w-full">
            <ul className=" w-full flex flex-col justify-center items-center gap-2">
                <li className=" w-full h-12 bg-white flex items-center justify-center"
                    onClick={()=> optionClickHandler("/agent")}>
                    Active Posts
                </li>
                <li className=" w-full h-12 bg-white flex items-center justify-center"
                    onClick={()=> optionClickHandler("/agent/archived")}>
                    Archived Posts
                </li>
                <li className=" w-full h-12 bg-white flex items-center justify-center"
                    onClick={()=> optionClickHandler("/agent/room-post/register")}>
                   Create New
                </li>
            </ul>
        </div>
    )
}