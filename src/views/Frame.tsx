import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import cn from 'classnames'

import { IState } from '@core/types'
import { switchOff, createNew } from '@core/actions'
import s from '@styles/index.scss'

const selectorIsOn = (state: IState) => state.system.isOn
const selectorItems = (state: IState) => state.form.items

const Frame: React.FC = () => {
  const isOn = useSelector(selectorIsOn)
  const items = useSelector(selectorItems)
  const dispatch = useDispatch()
  const onClickSwitch = () => dispatch(switchOff())
  const onClickNew = () => dispatch(createNew())

  return (
    <div className={cn(`className`, s.Box)}>
      <input
        type="button"
        value={isOn ? `ON` : `OFF`}
        onClick={onClickSwitch}
      />
      <br />
      items: {items.join(`, `)}
      <br />
      <input type="button" value="create new item" onClick={onClickNew} />
    </div>
  )
}

export default Frame
