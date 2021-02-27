import React, { FC, useMemo } from 'react'
import { FcHighPriority, FcOk } from 'react-icons/fc'
import { useTable, usePagination } from 'react-table'
import { TextSkeleton } from '../components/Skeleton'
import { store } from 'react-notifications-component';
import { NotificationType } from '../models/NotificationType';
import { TableSettings } from '../models/TableSettings'
import LastUpdated from './LastUpdated';

const Table: FC<TableSettings> = (props, { showPagination = true }) => {

  const tableData = useMemo(
    () => (
      props.isLoading ? Array(10).fill({}) : props.data),
    [props.isLoading, props.data]
  );

  const tableColumns = useMemo(
    () => props.columns.filter(c => c.checked === true),
    [props.columns]
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
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

  const copiedNotificationWithIcon = (type: NotificationType, copiedText: string) => {
    store.addNotification({
      title: type === 'success' ? 'Text copied' : 'Error copying text',
      message: type === 'success' ? `'${copiedText}' copied to clipboard!.` : copiedText,
      type: type,
      insert: 'bottom',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 3000,
        onScreen: true
      }
    });
  };

  const copyToClipboard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLParagraphElement
    navigator.clipboard.writeText(target.innerText).then(() =>
      copiedNotificationWithIcon('success', target.innerText)
    ).catch((e) => {
      copiedNotificationWithIcon('danger', e.message)
    })
  }

  return (
    <div className='flex flex-col space-y-3'>
      <div className='flex justify-between'>
        <div>
          {props.showPagination ?? (showPagination &&
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
            </div>)
          }
        </div>
        <div>
          {!!props.dataUpdatedAt &&
            <LastUpdated dataUpdatedAt={props.dataUpdatedAt} />
          }
        </div>
      </div>
      <div className='overflow-x-auto'>
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
                        {props.isLoading ? <TextSkeleton /> :
                          (cell.value === false ? <FcHighPriority className='justify-self-center' /> :
                            cell.value === true ? <FcOk /> : (cell.column.id === 'email' ?
                              <div onClick={(e) => copyToClipboard(e)}>
                                {cell.value}
                              </div>
                              : cell.value))}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {props.showPagination ?? (showPagination && <div className='pagination'>
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
      </div>)
      }
    </div>
  )
}

export default Table

// usePagination: https://react-table.tanstack.com/docs/api/usePagination