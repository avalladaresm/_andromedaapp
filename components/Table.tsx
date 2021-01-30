import React, { useEffect, useMemo, useState } from 'react'
import { FcHighPriority, FcOk } from 'react-icons/fc'
import { useTable, usePagination } from 'react-table'
import Select from 'react-select'
import { TextSkeleton } from '../components/Skeleton'

export default function Table(props) {
  const tableData = useMemo(
    () => (
      props.isLoading ? Array(10).fill({}) : props.data),
    [props.isLoading, props.data]
  );

  const tableColumns = useMemo(
    () => props.columns,
    []
  )

  const [options, setOptions] = useState([])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    toggleHideColumn,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({
    columns: tableColumns, data: tableData, initialState: { pageIndex: 0 },
  }, usePagination)

  useEffect(() => {
    const options = []
    props.columns.map(x => {
      const option = { value: '', label: '', isVisible: true }
      option.value = x.accessor
      option.label = x.Header
      option.isVisible = x.isVisible
      options.push(option)
    })
    setOptions(options)
  }, [])

  const onChange = (options, action) => {
    action.action === 'remove-value' && toggleHideColumn(action.removedValue.value)
    action.action === 'select-option' && toggleHideColumn(action.option.value)
  }

  return (
    <div className='flex flex-col space-y-3'>
      <div className='self-end'>
        <label>Visible Columns</label>
        <Select menuPlacement='auto' className='min-w-xxs max-w-max' options={options} onChange={onChange}
          isMulti isClearable defaultValue={props.columns.map(c => {
            const temp = { value: '', label: '' }
            temp.value = c.accessor
            temp.label = c.Header
            return temp
          })} closeMenuOnSelect={false}
        />
      </div>
      <div className='pagination'>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <table {...getTableProps()} className='table-auto border-collapse'>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}
                  className={`border border-blue-900 p-1 bg-blue-300`} >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}
                      className={`border border-blue-900 p-1 bg-blue-100`} >
                      {props.isLoading ? <TextSkeleton /> : (cell.value === false ? <FcHighPriority className='justify-self-center' /> :
                        cell.value === true ? <FcOk /> : cell.value)}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='pagination'>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

// usePagination: https://react-table.tanstack.com/docs/api/usePagination