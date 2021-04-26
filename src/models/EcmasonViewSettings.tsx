import { useState } from 'react';
import { createNullaryModel, createSelector } from 'react-scoped-model';
import tuple from '../utils/tuple';

export const EcmasonViewSettings = createNullaryModel(() => {
  const [theme, setTheme] = useState<string>('bright');
  const [displayDataTypes, setDisplayDataTypes] = useState(true);
  const [displayArrayKeys, setDisplayArrayKeys] = useState(true);
  const [displayObjectSize, setDisplayObjectSize] = useState(true);
  const [quotesOnKeys, setQuotesOnKeys] = useState(true);

  // collapseStringsAfterLength?: number;
  // indentSize?: number;

  return {
    theme: tuple(theme, setTheme),
    displayDataTypes: tuple(displayDataTypes, setDisplayDataTypes),
    displayArrayKeys: tuple(displayArrayKeys, setDisplayArrayKeys),
    displayObjectSize: tuple(displayObjectSize, setDisplayObjectSize),
    quotesOnKeys: tuple(quotesOnKeys, setQuotesOnKeys),
    states: {
      theme,
      displayDataTypes,
      displayArrayKeys,
      displayObjectSize,
      quotesOnKeys,
    },
  };
});

export const useEcmasonViewSettingsStates = createSelector(
  EcmasonViewSettings,
  (state) => state.states,
);

export const useEcmasonViewSettingsThemeState = createSelector(
  EcmasonViewSettings,
  (state) => state.theme,
);

export const useEcmasonViewSettingsDisplayArrayKeysState = createSelector(
  EcmasonViewSettings,
  (state) => state.displayArrayKeys,
);

export const useEcmasonViewSettingsDisplayObjectSizeState = createSelector(
  EcmasonViewSettings,
  (state) => state.displayObjectSize,
);

export const useEcmasonViewSettingsDisplayDataTypesState = createSelector(
  EcmasonViewSettings,
  (state) => state.displayDataTypes,
);

export const useEcmasonViewSettingsQuotesOnKeysState = createSelector(
  EcmasonViewSettings,
  (state) => state.quotesOnKeys,
);
