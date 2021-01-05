import Navigation from "../../components/navigation";
import { notification, Table } from 'antd'
import { FetchLogs, useLogs } from "../../services/log";
import { useEffect, useState } from "react";
import { useIsFetching, useQueryClient } from "react-query"

export default function Logs() {
  const [allLogs, setAllLogs] = useState({ data: [] })
  const queryClient = useQueryClient()
  const logs = useLogs(queryClient)
  const isFetching = useIsFetching()

  useEffect(() => {
    const f = async () => {
      setAllLogs(logs ?? await FetchLogs(queryClient))
    }
    f()
  }, [])

  useEffect(() => {
    if ((logs?.data && logs.data.length !== 0 || allLogs.data.length !== 0) && isFetching === 0) {
      const newRows = logs?.data.length - allLogs.data.length
      openNotificationWithIcon(newRows)
      newRows > 0 && setAllLogs(logs)
    }
  }, [isFetching])

  const openNotificationWithIcon = (rowsFetched: number) => {
    notification.info({
      message: 'Refetching complete',
      description: `Refetching data complete, ${rowsFetched} new rows fetched.`,
      duration: 10
    });
  };

  const columns: any = [
    {
      title: 'Username',
      dataIndex: 'userName',
      key: 'userName',
      responsive: ['sm'],
      isShowing: true
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      responsive: ['xxl'],
      isShowing: true
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      valueType: 'dateTime',
      responsive: ['xxl'],
      /* render: date => (
        console.log(date),
        <Tooltip placement='topLeft' title={''
          // moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')
          }>
          {date}
        </Tooltip>
      ), */
      isShowing: true
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      responsive: ['md'],
      isShowing: true
    },
    {
      title: 'Data',
      dataIndex: 'data',
      key: 'data',
      responsive: ['lg'],
      isShowing: true
    }
  ]

  return (
    <Navigation
      actionBar={{
        pageTitle: 'Logs',
        navItems: [{ title: 'Refresh', onClick: () => { queryClient.refetchQueries(['Logs']) } }],
        isLoading: isFetching === 1
      }}
    >
      <Table
        rowKey='id'
        size='small'
        style={{ overflowX: 'auto' }}
        columns={columns}
        dataSource={allLogs?.data?.length > 0 ? allLogs?.data : []}
        loading={isFetching === 1}
        pagination={{
          pageSize: 100,
          position: ['topRight', 'bottomRight']
        }}
      />
    </Navigation>
  )
}