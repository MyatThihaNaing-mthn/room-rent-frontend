import { useEffect, useState } from "react";
import { GoTriangleRight } from "react-icons/go";

function DropDownItem({labelName, options, onChange, value}){
    const[isOpen, setOpen] = useState(false);
    const[selectedValue, setSelectedValue] = useState(value);
    
    const onOptionClicked = (option) => {
        setSelectedValue(option)
        setOpen(false)
        onChange(option)
        }

    useEffect(() => {
            setSelectedValue(value);
        }, [value]);

    return <div className=" w-full flex flex-col p-2 items-center justify-center ">
        {labelName && <label htmlFor={labelName}
            className=" self-start text-white">{labelName}:3</label>}
        <button className=" relative bg-white p-2 w-full h-12 max-h-12 shadow-lg flex items-center"
                id={labelName}
                type="button"
                onClick={()=>{setOpen(!isOpen)}}>
            <div className=" max-w-full w-full overflow-hidden text-ellipsis">
                <span className="whitespace-nowrap">{selectedValue}</span>
            </div>
            <div className=" ml-auto">
                <GoTriangleRight size={20} className={`${isOpen ? 'rotate-90' : ''}`}/>
            </div>
            
            {isOpen &&
                <div className=" absolute z-10 top-full left-0 w-full max-h-40 bg-white mt-1 overflow-y-scroll">
                    <ul>
                        <li key="None"
                            value={null}
                            className="border py-1 hover:bg-slate-600"
                            onClick={()=> onOptionClicked(null)}>
                            None
                        </li>
                        {options && options.map(option =>
                            <li key={option} 
                                value={option}
                                className=" border py-1 hover:bg-slate-600"
                                onClick={()=>onOptionClicked(option)}>
                                {option}
                            </li>)}
                    </ul>
                </div>
            }
        </button>
        
    </div>
}

export default DropDownItem