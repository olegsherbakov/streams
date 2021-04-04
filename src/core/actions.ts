import { fromEvent, merge, Subscription } from 'rxjs'
import { sample, mapTo } from 'rxjs/operators'
import { ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { ACTIONS, IState, IDependencies, ActionTypes } from '@core/types'

type ThunkResult<T> = ThunkAction<T, IState, IDependencies, ActionTypes>

const listener = merge(
  fromEvent(document, `mousedown`).pipe(mapTo(false)),
  fromEvent(document, `mousemove`).pipe(mapTo(true))
).pipe(sample(fromEvent(document, `mouseup`)))

let subscription: Subscription

export const switchOff: ActionCreator<ThunkResult<ActionTypes>> = () => {
  return function (dispatch, getState) {
    const {
      system: { isOn },
    } = getState()

    isOn
      ? subscription.unsubscribe()
      : (subscription = listener.subscribe((isDragging) => {
          console.log(`Were you dragging?`, isDragging)
        }))

    return dispatch({
      type: isOn ? ACTIONS.OFF : ACTIONS.ON,
    })
  }
}

export const createNew: ActionCreator<ThunkResult<ActionTypes>> = () => {
  return function (dispatch, getState) {
    const {
      system: { range },
    } = getState()
    const newItem = Math.floor(Math.random() * range)

    return dispatch({
      type: ACTIONS.PUSH,
      payload: { newItem },
    })
  }
}

export const changeRange: ActionCreator<ThunkResult<ActionTypes>> = (
  range: number
) => {
  return function (dispatch) {
    return dispatch({
      type: ACTIONS.CHANGE,
      payload: { range },
    })
  }
}
