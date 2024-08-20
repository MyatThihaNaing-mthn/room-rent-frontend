import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function AgentCard({agent}){
    return(
        <section className="border rounded-md m-2 p-2 pb-5 flex flex-col justify-center items-center">
            <div className="flex items-start self-start">
                <div className=" xs:w-20 xs:h-20 bg-cover bg-center rounded-full"
                        style={{backgroundImage: `url(${agent.profilePhoto})`}}>
                </div>
                <div className=" flex justify-center h-full self-center p-2">
                    <h2 className="text-xl font-bold">{agent.username}</h2>
                </div>
            </div>
            <div className=" flex flex-col w-full items-start mt-1 justify-center gap-3">
                <div className=" max-w-full w-full flex border rounded-2xl shadow-md px-10 py-1">
                    <FaPhoneSquareAlt size={32} className=" fill-green-400 mr-2"/>
                    {agent.phoneNumber}
                </div>
                <div className=" w-full flex border rounded-2xl shadow-md px-10 py-1 break-words">
                    <MdEmail size={32} className=" fill-green-400 mr-2 flex-shrink-0"/>
                    <p className=" text-wrap overflow-hidden">{agent.email}</p>
                </div>
            </div>
        </section>
    )
}


export default AgentCard