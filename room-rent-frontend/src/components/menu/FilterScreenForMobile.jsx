import{ useEffect } from "react"

function FilterScreenForMobile({isOpen,children}){
    
    useEffect(()=> {
        document.body.style.overflow = isOpen? "hidden" : "auto"
        return () => {
            document.body.style.overflow = "auto"
        }
    }
    , [isOpen])

    const open = isOpen? " translate-x-0 " : "-translate-x-full"
    return <div className={`w-screen absolute bottom-0 left-0
                              transform duration-500 flex-col items-center
                              flex bg-slate-600 z-10 p-4 ${open} `}
                style={{height: 'calc(100vh - 56px)'}}>
            
            {/* {React.Children.map(children, child => 
                React.cloneElement(child, {filterParams, setFilterParams}))} */}
            {children}

    </div>
}


export default FilterScreenForMobile