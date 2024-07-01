import { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

function Navbar(){
    const[isMenuOpen, setMenuOpen] = useState(false)

    const menuOpenHandler = () => {
        setMenuOpen(true)
    }

    const menuCloseHandler = () => {
        setMenuOpen(false)
    }

    return <header className="relative w-full bg-slate-600 ">
        <nav>
            <ul className=" flex justify-between p-4">
                <li>Logo</li>
                <li className=" block sm:hidden">
                    {isMenuOpen ? <IoCloseOutline size={24} onClick={menuCloseHandler}/> : <FiAlignJustify size={24} onClick={menuOpenHandler}/>}
                </li>
            </ul>
        </nav>
        <FilterScreenForMobile isOpen={isMenuOpen}/>
    </header>
}

function FilterScreenForMobile({isOpen}){
    const open = isOpen? " translate-x-0 " : "-translate-x-full"
    return <div className={`w-full h-dvh absolute top-full right-0
                              transform duration-500
                             flex bg-green-600 z-10 ${open} `}>

    </div>
}

export default Navbar