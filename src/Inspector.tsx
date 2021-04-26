import { Card } from '@geist-ui/react';
import { Schemes, schemes } from 'base16-ts';
import React from 'react';
import { View } from 'react-ecmason-view';
import { useEcmasonViewSettingsStates } from './models/EcmasonViewSettings';

interface InspectorProps<T> {
  data: T;
}

const base16Schemes: Schemes = schemes;

export default function Inspector<T>({ data }: InspectorProps<T>): JSX.Element {
  const states = useEcmasonViewSettingsStates();

  return (
    <View
      {...states}
      theme={base16Schemes[states.theme]}
      value={data}
    />
  );
}
