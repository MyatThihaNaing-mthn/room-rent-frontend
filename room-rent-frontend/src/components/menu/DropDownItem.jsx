import { useState } from "react";


function DropDownItem({name, id, options, filterParams, filterBuilder, onChange}){
    const[isOpen, setOpen] = useState(false);
    const[selectedValue, setSelectedValue] = useState(undefined);
    
    const onOptionClicked = (option) => {
        onChange(option)
        setSelectedValue(option)
        setOpen(false)
        filterBuilder({
            ...filterParams,
            [id]: option
        })
    }
    return <div className=" w-full flex flex-col p-2 items-center justify-center">
        {name && <label htmlFor={name}
            className=" self-start text-white">{name}:</label>}
        <button className=" relative bg-red-300 p-2 w-full h-12 max-h-12 shadow-lg"
                type="button"
                onClick={()=>{setOpen(!isOpen)}}>
            <div className=" max-w-full w-full overflow-hidden text-ellipsis">
                <span className="whitespace-nowrap">{selectedValue}</span>
            </div>
            
            {isOpen &&
                <div className=" absolute z-10 top-full left-0 w-full max-h-40 bg-white mt-1 overflow-y-scroll">
                    <ul>
                        <li key="None"
                            value={undefined}
                            className="border py-1 hover:bg-slate-600"
                            onClick={()=> onOptionClicked(undefined)}>
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