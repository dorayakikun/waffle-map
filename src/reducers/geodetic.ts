import { Action, ActionKeys } from '../actions/geodetic'

export interface State {
  unit: string
  datum: string
}
export const initialState: State = {
  datum: 'WGS84',
  unit: 'degree',
}

const changeDatum = (state: State, datum: string): State => ({
  ...state,
  datum,
})

const changeUnit = (state: State, unit: string): State => ({
  ...state,
  unit,
})

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionKeys.CHANGE_DATUM:
      return changeDatum(state, action.payload.datum)
    case ActionKeys.CHANGE_UNIT:
      return changeUnit(state, action.payload.unit)
    default:
      return state
  }
}
