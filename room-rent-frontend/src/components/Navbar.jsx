import { memo, useEffect, useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import FilterScreenForMobile from "./menu/FilterScreenForMobile";
import SearchBar from "./menu/SearchBar";
import SearchFields from "./menu/SearchFields";
import FilterButton from "./menu/FilterButton";
import { Link } from "react-router-dom";


function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false)
    const [searchParams, setSearchParams] = useState();

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
        <header className="w-full h-12 bg-slate-600">
            <nav>
                <ul className=" flex justify-between p-4">
                    <li>
                        <Link to="/">Logo</Link>
                    </li>
                    <li className=" block sm:hidden">
                        {isMenuOpen ? <IoCloseOutline size={24} onClick={menuCloseHandler} /> : <FiAlignJustify size={24} onClick={menuOpenHandler} />}
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