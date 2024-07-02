import { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

const languages = ["java", "javascript", "swift", "c#", "ruby", "c", "c++", "assembly", "python" ]

function Navbar(){
    const[isMenuOpen, setMenuOpen] = useState(false)

    const menuOpenHandler = () => {
        setMenuOpen(true)
    }

    const menuCloseHandler = () => {
        setMenuOpen(false)
    }

    return <header className="relative w-full h-12 bg-slate-600 ">
        <nav>
            <ul className=" flex justify-between p-4">
                <li>Logo</li>
                <li className=" block sm:hidden">
                    {isMenuOpen ? <IoCloseOutline size={24} onClick={menuCloseHandler}/> : <FiAlignJustify size={24} onClick={menuOpenHandler}/>}
                </li>
            </ul>
        </nav>
        <FilterScreenForMobile isOpen={isMenuOpen} key={isMenuOpen}>
            <SearchBar/>
            <SearchParameters/>
        </FilterScreenForMobile>
    </header>
}


function FilterScreenForMobile({isOpen,children}){
    const open = isOpen? " translate-x-0 " : "-translate-x-full"
    return <div className={`w-full absolute top-full right-0
                              transform duration-500 flex-col items-center
                              flex bg-slate-600 z-10 p-4 ${open} `}
                style={{height: 'calc(100vh - 48px)'}}>
            
            {children}

    </div>
}

function SearchBar(){
    return <div>
        <input type="text" placeholder="Search by location" className=" w-56 h-12 p-2 rounded-xl"/>
    </div>
}

function SearchParameters(){
    return <div className=" grid grid-cols-2">
        <DropDownItem name="Language" options={languages}/>
        <DropDownItem name="Language" options={languages}/>
        <DropDownItem name="Language" options={languages}/>
        <DropDownItem name="Language" options={languages}/>
    </div>
}

function DropDownItem({name, options}){
    const[isOpen, setOpen] = useState(false);
    const[selectedValue, setSelectedValue] = useState(undefined);
    
    const onOptionClicked = (option) => {
        setSelectedValue(option)
        setOpen(false)
    }
    return <div className=" w-full flex flex-col p-2">
        <button className=" relative bg-red-300 p-2 w-fit"
                onClick={()=>{setOpen(!isOpen)}}>
            {name}:{selectedValue}
            {isOpen && 
                <div className=" absolute z-10 top-full left-0 w-full max-h-40 bg-white mt-1 overflow-y-scroll">
                    <ul>
                        {options.map(option =>
                            <li key={option} 
                                value={option}
                                className=" border py-1"
                                onClick={()=>onOptionClicked(option)}>
                                {option}
                            </li>)}
                    </ul>
                </div>
            }
        </button>
        
    </div>
}

export default Navbar