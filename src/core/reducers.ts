import { Reducer } from 'redux'

import { ACTIONS, ActionTypes, IStateForm, IStateSystem } from '@core/types'

const initialStateSystem: IStateSystem = {
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
  }
  return state
}
