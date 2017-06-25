// @flow

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'

import type { MeshInputAction } from '../actions/meshInput'

import type { MapState } from './map'
import type { MeshInputState } from './meshInput'

export type State = MapState & MeshInputState

export type Action = MeshInputAction

export type Store = ReduxStore<State, Action>

export type Dispatch = ReduxDispatch<Action>
