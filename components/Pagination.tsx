import React from 'react'
import { HiOutlineChevronDoubleLeft, HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineChevronDoubleRight } from 'react-icons/hi'

const Pagination = ({
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  pageIndex,
  pageSize
}) => {
  return (
    <div className='flex flex-row space-x-3'>
      <div className='flex flex-row space-x-1'>
        <button
          title='Go to first page'
          className={`p-1 rounded-sm self-center bg-blue-400 disabled:opacity-50 ${!canPreviousPage && 'cursor-not-allowed'}`}
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <HiOutlineChevronDoubleLeft />
        </button>
        <button
          title='Go to previous page'
          className={`p-1 rounded-sm self-center bg-blue-400 disabled:opacity-50 ${!canPreviousPage && 'cursor-not-allowed'}`}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <HiOutlineChevronLeft />
        </button>
        <div className='font-bold self-center'>
          {pageIndex + 1}/{pageOptions.length}
        </div>
        <button
          title='Go to next page'
          className={`p-1 rounded-sm self-center bg-blue-400 disabled:opacity-50 ${!canNextPage && 'cursor-not-allowed'}`}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <HiOutlineChevronRight />
        </button>
        <button
          title='Go to last page'
          className={`p-1 rounded-sm self-center bg-blue-400 disabled:opacity-50 ${!canNextPage && 'cursor-not-allowed'}`}
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <HiOutlineChevronDoubleRight />
        </button>
      </div>
      <div>
        <select
          className='border border-black'
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50, 100].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize} / page
            </option>
          ))}
        </select>
      </div>
      <div className='space-x-1'>
        <span>
          Go to
                </span>
        <input
          className='px-1 border border-black w-12'
          defaultValue={pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(page)
          }}
        />
      </div>
    </div>
  )
}

export default Pagination