export enum ActionKeys {
  CHANGE_DATUM = 'geodetic/change_datum',
  CHANGE_UNIT = 'geodetic/change_unit',
}

interface ChangeDatumAction {
  readonly type: ActionKeys.CHANGE_DATUM
  payload: { datum: string }
}
interface ChangeUnitAction {
  readonly type: ActionKeys.CHANGE_UNIT
  payload: { unit: string }
}

export type Action = ChangeDatumAction | ChangeUnitAction

export const changeDatum = (datum: string): ChangeDatumAction => ({
  payload: { datum },
  type: ActionKeys.CHANGE_DATUM,
})

export const changeUnit = (unit: string): ChangeUnitAction => ({
  payload: { unit },
  type: ActionKeys.CHANGE_UNIT,
})
