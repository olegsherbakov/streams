import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { IState } from '@core/types'
import s from '@styles/index.scss'
import Item from '@views/Item'
import { playGame } from '@core/actions'

const selectorItems = (state: IState) => state.form.items

const Desktop: React.FC = () => {
  const ref = React.useRef()
  const dispatch = useDispatch()
  const items = useSelector(selectorItems)

  React.useEffect(() => playGame(ref.current, dispatch), [])

  return (
    <div className={s.Desktop} ref={ref}>
      {items.map((count: number, i: number) => (
        <Item key={i} index={i} value={count} />
      ))}
    </div>
  )
}

export default React.memo(Desktop)
