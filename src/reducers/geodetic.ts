import { Action, ActionKeys } from '../actions/geodetic'

export interface State {
  unit: string
  datum: string
}

const changeDatum = (state: State, datum: string): State => ({
  ...state,
  datum,
})

const changeUnit = (state: State, unit: string) => ({
  ...state,
  unit,
})

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionKeys.CHANGE_DATUM:
      return changeDatum(state, action.payload.datum)
    case ActionKeys.CHANGE_UNIT:
      return changeUnit(state, action.payload.unit)
    default:
      return state
  }
}
