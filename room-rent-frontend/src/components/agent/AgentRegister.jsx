import axios from "axios";
import { memo, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
const agentRegisterURL = "http://localhost:8080/api/auth/v1/agent/register"
export default function AgentRegister() {
    const [image, setImage] = useState();
    const [agent, setAgent] = useState();
    const navigate = useNavigate();

    console.log(agent)
    const valueChangeHandler = (e) => {
        const element = e.target.id
        const value = e.target.value
        switch (element) {
            case "username":
                setAgent({
                    ...agent,
                    username: value
                })
                break;
            case "password":
                setAgent({
                    ...agent,
                    password: value
                })
                break;
            case "email":
                setAgent({
                    ...agent,
                    email: value
                })
                break;
            case "phone-number":
                setAgent({
                    ...agent,
                    phoneNumber: value
                })
                break;
        }
    }

    const imageChangeHandler = (selectedImage) => {
        if (selectedImage) {
            setImage(selectedImage)
            setAgent(
                {
                    ...agent,
                    profileImage: selectedImage
                }
            )
        } else {
            return
        }
    }

    const submitHandler = async(e) => {
        e.preventDefault()
        try{
            const formData = new FormData();
            formData.append("username", agent.username)
            formData.append("email", agent.email)
            formData.append("password", agent.password)
            formData.append("phoneNumber", agent.phoneNumber)
            if(agent.profileImage){
                formData.append("profileImage", agent.profileImage)
            }
            const response = await axios.post(agentRegisterURL, formData ,{
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            })
            if(response.status == 201){
                navigate("/login")
            }
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className=" w-full">
            <form onSubmit={submitHandler}
                    className="w-full flex flex-col gap-4 p-6">
            <MeoizedImageUpload profileImage={image}
                uploadImage={imageChangeHandler}
            />
            <div className=" flex flex-col gap-2">
                <TextInputField type="text"
                    placeholder="Username"
                    id="username"
                    onChange={valueChangeHandler}
                />
                <TextInputField type="password"
                    placeholder="Password"
                    id="password"
                    onChange={valueChangeHandler}
                />
                <TextInputField type="text"
                    placeholder="Email"
                    id="email"
                    onChange={valueChangeHandler}
                />
                <TextInputField type="text"
                    placeholder="Phone number"
                    id="phone-number"
                    onChange={valueChangeHandler}
                />
            </div>
            <button type="submit"
                className=" w-full h-12 p-2 text-sm font-bold text-white bg-red-300">
                Register
            </button>
            </form>
        </div>
    )
}

function TextInputField({id, type, onChange, placeholder}){
   return (
    <input type={type}
            className=" border shadow-lg p-2 text-sm font-light"
            alt={placeholder}
            placeholder={placeholder}
            id={id}
            onChange={onChange}
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