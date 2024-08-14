export default function Agentprofile({agent}){
    return (
        <div className=" w-full flex flex-col items-center justify-center">
            <div className=" flex items-center w-52 h-52 bg-cover bg-center rounded-full border"
                style={{backgroundImage: `url(${agent.profilePhoto})`}}>
            </div>
            <div className=" flex flex-col items-start">
                <p>Name {agent.username}</p>
                <p>Email {agent.email}</p>
                <p>Phone Number {agent.phoneNumber}</p>
            </div>
            <button className=" w-32 h-16 border font-bold">
                Edit
            </button>
        </div>
    )
}