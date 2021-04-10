import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { IState } from '@core/types'
import { switchOff, createNew, changeRange } from '@core/actions'
import s from '@styles/index.scss'
import Desktop from '@views/Desktop'

const selectorIsOn = (state: IState) => state.system.isOn
const selectorRange = (state: IState) => state.system.range

const Frame: React.FC = () => {
  const isOn = useSelector(selectorIsOn)
  const range = useSelector(selectorRange)
  const dispatch = useDispatch()
  const onClickSwitch = () => dispatch(switchOff())
  const onClickNew = () => dispatch(createNew())
  const onChangeRange = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(changeRange(+event.target.value))

  return (
    <>
      <div className={s.LeftPanel}>
        <input
          type="button"
          className={s.Button}
          value={isOn ? `OFF` : `ON`}
          onClick={onClickSwitch}
        />
        <br />
        <br />
        <input
          type="button"
          className={s.Button}
          value="create new item"
          onClick={onClickNew}
        />
        <br />
        <br />
        <input
          type="range"
          className={s.Range}
          min="10"
          max="100"
          value={range}
          onChange={onChangeRange}
          step="10"
        />{' '}
        current range: {range}
      </div>
      <Desktop />
    </>
  )
}

export default Frame
