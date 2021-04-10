import { Reducer } from 'redux'

import { ACTIONS, ActionTypes, IStateForm, IStateSystem } from '@core/types'

const initialStateSystem: IStateSystem = {
  range: 100,
  isOn: false,
}

export const system: Reducer<IStateSystem> = function (
  state: IStateSystem = initialStateSystem,
  action: ActionTypes
) {
  switch (action.type) {
    case ACTIONS.ON: {
      return {
        ...state,
        isOn: true,
      }
    }
    case ACTIONS.OFF: {
      return {
        ...state,
        isOn: false,
      }
    }
    case ACTIONS.CHANGE: {
      const { range } = action.payload
      return {
        ...state,
        range,
      }
    }
  }
  return state
}

const initialStateForm: IStateForm = {
  items: [],
}

export const form: Reducer<IStateForm> = function (
  state: IStateForm = initialStateForm,
  action: ActionTypes
) {
  switch (action.type) {
    case ACTIONS.PUSH: {
      return {
        ...state,
        items: [...state.items, action.payload.newItem],
      }
    }
    case ACTIONS.TAKE: {
      const items = state.items.reduce<number[]>((result, count, index) => {
        if (index === action.payload.index) {
          if (count > 1) {
            result.push(count - 1)
          }
        } else {
          result.push(count)
        }

        return result
      }, [])

      return {
        ...state,
        items,
      }
    }
  }
  return state
}
