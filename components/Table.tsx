import React from 'react'
import { FcHighPriority, FcOk } from 'react-icons/fc'
import { useTable } from 'react-table'

export default function Table(props) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns: props.columns, data: props.data })

  return (
    <table {...getTableProps()} className='m-3'>
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
  )
}