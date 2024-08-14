import axios from "axios";
import { useEffect, useMemo, useState, memo } from "react";
import { useForm } from "react-hook-form"
import Agentprofile from "./AgentProfile";

const agentProfileURL="http://localhost:8080/api/v1/agent/profile"
export default function AgentDetails({mode="details"}){
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {errors}
    } = useForm();
    const [isLoading, setLoading] = useState(true);
    const [agent, setAgent] = useState();

    const onSubmit = (data) =>{
        console.log(data)
    }

    const getConfig = () => {
        const accessToken = localStorage.getItem("accessToken")
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }
        return config
    }

    const fetchAgentProfile = async() =>{
        try{
            const response = await axios.get(agentProfileURL, getConfig())
            const agent = response.data
            console.log(response.data)
            setAgent(agent)
            reset(agent)
        }catch(error){
            console.log("error getting agent profile", error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=> {
        fetchAgentProfile()
    }, [mode])

    if(mode === "edit"){
        return (
            <div className=" w-full">
                {isLoading ? "Loading" :
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className=" flex flex-col gap-2">
                        <TextInputField
                            type="text"
                            placeholder="Username"
                            id="username"
                            disabled={true}
                            onChange={register}
                        />
                        <TextInputField
                            type="text"
                            placeholder="Email"
                            id="email"
                            onChange={register}
                        />
                        <TextInputField
                            type="text"
                            placeholder="Phone number"
                            id="phoneNumber"
                            onChange={register}
                        />
                    </div>
                </form>
                }
            </div>
        )
    }else{
        return <>
            {agent && <Agentprofile agent={agent}/>}
        </>
    }

    
}

function TextInputField({id, type, onChange, placeholder, disabled=false}){
    return (
     <input type={type}
             className=" border shadow-lg p-2 text-sm font-light"
             alt={placeholder}
             placeholder={placeholder}
             id={id}
             disabled={disabled}
             {...onChange(id)}
             required={true}
     />
    )
 }
 
 function ImageUpload({ profileImage, uploadImage }) {
     const imageURL = useMemo(()=>profileImage? URL.createObjectURL(profileImage):undefined, [profileImage])
     console.log(imageURL)
     const imageUploadHandler = (e) => {
         if (!e.target.files || e.target.files.length == 0) {
             return
         }
         const selectedImage = e.target.files[0]
         uploadImage(selectedImage)
     }
 
     return (
         <div className=" relative flex items-center w-32 h-32 border bg-cover bg-center cursor-pointer"
             style={{ backgroundImage: `url(${imageURL})` }}>
             <label htmlFor="agent-profile-photo" className="w-full text-xs text-black text-center p-1 cursor-pointer hover:text-blue-500">
                 {profileImage ? "" : "Upload Image"}
             </label>
             <input type="file"
                 id="agent-profile-photo"
                 className=" absolute w-full h-full top-0 left-0 opacity-0"
                 alt="profile image"
                 placeholder="Upload Profile Photo"
                 onChange={(e) => imageUploadHandler(e)}
             />
         </div>
     )
 }
 
 const MeoizedImageUpload = memo(ImageUpload)