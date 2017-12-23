// @flow

import test from 'ava';
import React from 'react';
import sinon from 'sinon';
import render from 'react-test-renderer';
import GridToggle from '../../src/components/GridToggle';

import type { Props } from '../../src/components/GridToggle';

test('Should set props to MeshToggle', t => {
  const isShowGrid = false;
  const props: Props = {
    title: 'Show grid',
    isShowGrid,
    onToggleChanged: () => { },
  };
  const tree = render.create(<GridToggle {...props} />).toJSON();
  t.snapshot(tree);
});

test('Should call onToggleChanged when changed checked', t => {
  const isShowGrid = false;
  const onToggleChanged = sinon.spy();
  const props: Props = {
    title: 'Show grid',
    isShowGrid,
    onToggleChanged,
  };
  const tree = render.create(<GridToggle {...props} />).toJSON();
  t.snapshot(tree);
});
