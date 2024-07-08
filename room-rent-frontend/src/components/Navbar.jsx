import { memo, useEffect, useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import FilterScreenForMobile from "./menu/FilterScreenForMobile";
import SearchBar from "./menu/SearchBar";
import SearchFields from "./menu/SearchFields";
import FilterButton from "./menu/FilterButton";
import { Link } from "react-router-dom";
import { useUserContext } from "./UserContext";


function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false)
    const [searchParams, setSearchParams] = useState();

    const {user} = useUserContext();

    const fetchSearchParams = async() => {
        const response = await fetch("http://localhost:8080/api/public/filter-keywords")
        const data = await response.json()
        setSearchParams(data.searchParams)
    }

    useEffect(
        ()=>{fetchSearchParams()}
    ,[])

    const menuOpenHandler = () => {
        setMenuOpen(true)
    }

    const menuCloseHandler = () => {
        setMenuOpen(false)
    }


    return <>
        <header className="w-full h-14 bg-slate-600">
            <nav className="flex max-h-full">
                <ul className=" flex justify-between p-4 w-full">
                    <li className=" text-white">
                        <Link to="/">Logo</Link>
                    </li>
                    <li className=" ml-auto mr-2 text-white">
                        <Link to="/login"> {user? user.username : "Login"} </Link>
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
            <SearchBar/>
            <SearchFields searchParams={searchParams}/>
            <FilterButton closeMenu={setMenuOpen}/>
        </FilterScreenForMobile>
    </>
}

const MemoizedNavBar = memo(Navbar)

export default MemoizedNavBar 