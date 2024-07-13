import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";

const logOutURL = "http://localhost:8080/api/agent/logout"
function UserProfileDropDown({ active }) {

    const {setUser} = useUserContext();
    const navigate = useNavigate();

    const viewProfileHander = () => {
        console.log("view profile")
    }


    const doLogOut = async () => {
        const accessToken = localStorage.getItem("accessToken");
        const config = {
            headers : {
                "Authorization": `Bearer ${accessToken}`
            },
            withCredentials : true
        }
        const response = await axios.post(logOutURL,{},config);
        if (response.status == 200) {
            localStorage.removeItem("accessToken");
            setUser(undefined)
            navigate('/')
        } else {
            console.log(response.data)
        }
    }

    const logoutHandler = () => {
        active(false)
        doLogOut();
    }
    return (
        <ul className="w-full h-full text-xs font-semibold flex flex-col">
            <li className=" flex justify-center items-center flex-1 hover:cursor-pointer"
                onClick={viewProfileHander}>
                View Profile
            </li>
            <li className=" flex justify-center items-center flex-1 hover:cursor-pointer"
                onClick={logoutHandler}>
                LogOut
            </li>
        </ul>
    )
}

export default UserProfileDropDown;