import { fromEvent, Subscription } from 'rxjs'
import { map, filter } from 'rxjs/operators'
import { ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { ACTIONS, IState, IDependencies, ActionTypes } from '@core/types'

type ThunkResult<T> = ThunkAction<T, IState, IDependencies, ActionTypes>
type Action = ActionCreator<ThunkResult<ActionTypes>>

export const switchOff: Action = () => {
  return function (dispatch, getState) {
    const {
      system: { isOn },
    } = getState()

    return dispatch({
      type: isOn ? ACTIONS.OFF : ACTIONS.ON,
    })
  }
}

export const createNew: Action = () => {
  return function (dispatch, getState) {
    const {
      system: { range },
    } = getState()
    const newItem = Math.floor(Math.random() * (range - 1)) + 1

    return dispatch({
      type: ACTIONS.PUSH,
      payload: { newItem },
    })
  }
}

export const changeRange: Action = (range: number) => {
  return function (dispatch) {
    return dispatch({
      type: ACTIONS.CHANGE,
      payload: { range },
    })
  }
}

export const takeItem: Action = (index: number) => {
  return function (dispatch, getState) {
    const {
      form: { items },
    } = getState()

    if (items.length < index) {
      return
    }

    return dispatch({
      type: ACTIONS.TAKE,
      payload: { index },
    })
  }
}

export const playGame: (
  element: HTMLElement,
  dispatch: Function
) => () => void = (element, dispatch) => {
  const listener = fromEvent(element, `click`).pipe(
    map((event) => event.target),
    map((target: HTMLElement) => target.getAttribute(`data-index`)),
    map(Number),
    filter((index) => index > -1)
  )

  const subscription: Subscription = listener.subscribe((index: number) => {
    dispatch(takeItem(index))
  })

  return () => {
    subscription.unsubscribe()
  }
}
