export interface IDependencies {
  log: (str: string) => void
}

export interface IState {
  system: IStateSystem
  form: IStateForm
}

export interface IStateSystem {
  range: number
  isOn: boolean
}

export interface IStateForm {
  items: number[]
}

export enum ACTIONS {
  ON,
  OFF,
  PUSH,
  CHANGE,
}

export interface IOnAction {
  type: typeof ACTIONS.ON
}

export interface IOffAction {
  type: typeof ACTIONS.OFF
}

export interface IPushAction {
  type: typeof ACTIONS.PUSH
  payload: { newItem: number }
}

export interface IChangeAction {
  type: typeof ACTIONS.CHANGE
  payload: { range: number }
}

export type ActionTypes = IOnAction | IOffAction | IPushAction | IChangeAction
