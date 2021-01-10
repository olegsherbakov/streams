import { pipe, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { ACTIONS, IState, IDependencies, ActionTypes } from '@core/types'

type ThunkResult<T> = ThunkAction<T, IState, IDependencies, ActionTypes>

export const switchOff: ActionCreator<ThunkResult<ActionTypes>> = () => {
  return function (dispatch, getState) {
    const {
      system: { isOn },
    } = getState()

    // TODO dev
    console.log(`?pipe`, pipe)
    console.log(`?of`, of)
    console.log(`?map`, map)

    return dispatch({
      type: isOn ? ACTIONS.OFF : ACTIONS.ON,
    })
  }
}

export const createNew: ActionCreator<ThunkResult<ActionTypes>> = () => {
  return function (dispatch, getState, { log }) {
    const newItem = Math.floor(Math.random() * 1000)

    log(`--createNew: ${newItem}`)

    return dispatch({
      type: ACTIONS.PUSH,
      payload: { newItem },
    })
  }
}
