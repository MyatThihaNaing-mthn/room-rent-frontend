
export default function AgentMenu() {
    return (
        <div className=" w-full">
            <ul className=" w-full flex flex-col justify-center items-center gap-2">
                <li className=" w-full h-12 bg-white flex items-center justify-center">
                    Active Posts
                </li>
                <li className=" w-full h-12 bg-white flex items-center justify-center">
                    Archived Posts
                </li>
                <li className=" w-full h-12 bg-white flex items-center justify-center">
                    Create New
                </li>
            </ul>
        </div>
    )
}