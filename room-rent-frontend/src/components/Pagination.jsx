import ReactPaginate from 'react-paginate';

export default function Pagination({onPageChange, totalPage}){
    
    return (
        <div>
            <ReactPaginate
                pageCount={totalPage}
                breakLabel="...."
                nextLabel=">>"
                pageRangeDisplayed={1}
                marginPagesDisplayed={2}
                onPageChange={onPageChange}
                previousLabel="<<"
                renderOnZeroPageCount={null}
                activeClassName='bg-violet-400 text-white'
                containerClassName=' flex items-center justify-center gap-1'
                pageClassName=' block border border-solid hover:cursor-pointer
                                w-10 h-10 flex items-center justify-center'           
            />
        </div>
    )
}