import React, { useEffect, useState } from 'react'
import { FcHighPriority, FcOk } from 'react-icons/fc'
import { useTable } from 'react-table'
import Select from 'react-select'

export default function Table(props) {
  const [options, setOptions] = useState([])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    toggleHideColumn
  } = useTable({
    columns: props.columns, data: props.data
  })

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
        <Select clos className='min-w-xxs max-w-max' options={options} onChange={onChange}
          isMulti isClearable defaultValue={props.columns.map(c => {
            const temp = { value: '', label: '' }
            temp.value = c.accessor
            temp.label = c.Header
            return temp
          })} closeMenuOnSelect={false}
        />
      </div>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}
                  className={`border-solid border border-black p-1`} >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}
                      className={`border-solid border border-black p-1`} >
                      {cell.value === false ? <FcHighPriority className='justify-self-center' /> :
                        cell.value === true ? <FcOk /> : cell.value}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}