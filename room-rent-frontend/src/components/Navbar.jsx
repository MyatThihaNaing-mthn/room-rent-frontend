import { memo, useEffect, useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import FilterScreenForMobile from "./menu/FilterScreenForMobile";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";
import UserProfileDropDown from "./UserProfileDropDown";
import UserMenu from "./menu/UserMenu";
import AgentMenu from "./menu/AgentMenu";


function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false)
    const [searchParams, setSearchParams] = useState();
    const [dropdownActive, setDropdownActive] = useState(false);
    const navigate = useNavigate();
    const { user } = useUserContext();

    const fetchSearchParams = async () => {
        const response = await fetch("http://localhost:8080/api/v1/public/filter-keywords")
        const data = await response.json()
        setSearchParams(data.searchParams)
    }


    useEffect(
        () => { fetchSearchParams() }
        , [])

    const menuOpenHandler = () => {
        setMenuOpen(true)
    }

    const menuCloseHandler = () => {
        setMenuOpen(false)
    }

    const loginClickHandler = () => {
        if (user) {
            setDropdownActive(!dropdownActive);
        } else {
            navigate('/login')
        }
    }



    return <>
        <header className="w-full h-14 bg-slate-600">
            <nav className="flex max-h-full">
                <ul className=" flex justify-between p-4 w-full">
                    <li className=" text-white">
                        <Link to="/">Logo</Link>
                    </li>
                    <li className=" relative ml-auto mr-2 text-white cursor-pointer"
                        onClick={loginClickHandler}>
                        {user ? user.username : "Login"}
                        {dropdownActive &&
                            <div className=" absolute w-20 h-20 bg-slate-600 top-full right-0 mt-1 z-10 rounded-sm">
                                <UserProfileDropDown active={setDropdownActive} />
                            </div>
                        }
                    </li>
                    <li className=" block sm:hidden">
                        {isMenuOpen ? <IoCloseOutline size={24}
                            onClick={menuCloseHandler}
                            className=" text-white" /> :
                            <FiAlignJustify size={24}
                                className=" text-white"
                                onClick={menuOpenHandler} />}
                    </li>
                </ul>
            </nav>
        </header>
        <FilterScreenForMobile isOpen={isMenuOpen} >
            {!user && <UserMenu searchParams={searchParams} setMenuOpen={setMenuOpen} />}
            {user && <AgentMenu setMenuOpen={setMenuOpen}/>}
        </FilterScreenForMobile>
    </>
}

const MemoizedNavBar = memo(Navbar)

export default MemoizedNavBar 