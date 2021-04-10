import * as React from 'react'

import s from '@styles/index.scss'

const Item: React.FC<{ index: number; value: number }> = ({ index, value }) => {
  return (
    <div className={s.Item} data-index={index}>
      {value}
    </div>
  )
}

export default Item
