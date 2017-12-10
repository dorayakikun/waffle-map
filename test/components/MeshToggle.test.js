// @flow

import test from 'ava'
import React from 'react'
import sinon from 'sinon'
import render from 'react-test-renderer'
import MeshToggle from '../../src/components/MeshToggle'

import type { Props as MeshToggleProps } from '../../src/components/MeshToggle'

test('Should set props to MeshToggle', t => {
    const isShowMeshes = false
    const props: MeshToggleProps = {
        isShowMeshes,
        onToggleChanged: () => { }
    }
    const tree = render.create(<MeshToggle {...props} />).toJSON()
    t.snapshot(tree)
})

test('Should call onToggleChanged when changed checked', t => {
    const isShowMeshes = false
    const onToggleChanged = sinon.spy()
    const props: MeshToggleProps = {
        isShowMeshes,
        onToggleChanged
    }
    const tree = render.create(<MeshToggle {...props} />).toJSON()
    t.snapshot(tree)
})
