import { format, formatDistance } from 'date-fns'
import React from 'react'
import ReactTooltip from 'react-tooltip'

const LastUpdated = (props) => {
  return (
    <div data-tip data-for={format(props.dataUpdatedAt, 'PPPP pp')}>
      Last updated: {formatDistance(props.dataUpdatedAt, new Date(), { addSuffix: true, includeSeconds: true })}
      <ReactTooltip id={format(props.dataUpdatedAt, 'PPPP pp')}>
        <span>{format(props.dataUpdatedAt, 'PPPP pp')}</span>
      </ReactTooltip>
    </div>
  )
}

export default LastUpdated