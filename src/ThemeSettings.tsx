import React, { useState } from 'react';
import {
  Description,
  Toggle,
  Text,
  AutoComplete,
} from '@geist-ui/react';
import { schemes, Schemes } from 'base16-ts';
import { useConstant } from '@lyonph/react-hooks';
import {
  useEcmasonViewSettingsDisplayArrayKeysState,
  useEcmasonViewSettingsDisplayObjectSizeState,
  useEcmasonViewSettingsDisplayDataTypesState,
  useEcmasonViewSettingsQuotesOnKeysState,
  useEcmasonViewSettingsThemeState,
} from './models/EcmasonViewSettings';
import Inspector from './Inspector';

const base16Schemes: Schemes = schemes;

function SelectScheme(): JSX.Element {
  const [theme, setTheme] = useEcmasonViewSettingsThemeState();
  const options = useConstant(() => Object.entries(base16Schemes).map(([key, value]) => ({
    label: value.scheme,
    value: key,
  })));

  const [currentOptions, setCurrentOptions] = useState(options);

  return (
    <AutoComplete
      placeholder="Enter scheme name here"
      initialValue={theme}
      options={currentOptions}
      onSelect={(currentValue) => {
        setTheme(currentValue);
      }}
      onSearch={(currentValue) => {
        if (currentValue) {
          setCurrentOptions(options.filter((value) => value.value.includes(currentValue)));
        } else {
          setCurrentOptions(options);
        }
      }}
    />
  );
}

function ToggleDisplayDataTypes() {
  const [value, setValue] = useEcmasonViewSettingsDisplayDataTypesState();

  return (
    <div className="SettingsField">
      <Toggle
        initialChecked={value}
        onChange={(event) => {
          setValue(event.target.checked);
        }}
      />
      <Text small className="SettingsLabel">
        Toggle Display Data Types
      </Text>
    </div>
  );
}

function ToggleDisplayObjectSize() {
  const [value, setValue] = useEcmasonViewSettingsDisplayObjectSizeState();

  return (
    <div className="SettingsField">
      <Toggle
        initialChecked={value}
        onChange={(event) => {
          setValue(event.target.checked);
        }}
      />
      <Text small className="SettingsLabel">
        Toggle Display Object Size
      </Text>
    </div>
  );
}

function ToggleDisplayArrayKeys() {
  const [value, setValue] = useEcmasonViewSettingsDisplayArrayKeysState();

  return (
    <div className="SettingsField">
      <Toggle
        initialChecked={value}
        onChange={(event) => {
          setValue(event.target.checked);
        }}
      />
      <Text small className="SettingsLabel">
        Toggle Display Array Keys
      </Text>
    </div>
  );
}

function ToggleQuotesOnKeys() {
  const [value, setValue] = useEcmasonViewSettingsQuotesOnKeysState();

  return (
    <div className="SettingsField">
      <Toggle
        initialChecked={value}
        onChange={(event) => {
          setValue(event.target.checked);
        }}
      />
      <Text small className="SettingsLabel">
        Toggle Quotes on Keys
      </Text>
    </div>
  );
}

function InspectorPreview(): JSX.Element {
  const exampleData = useConstant(() => {
    const a = new Map<any, any>([
      [/Hello World/, new Date()],
      [Promise.resolve(), function exampleCallback() { /* */ }],
    ]);

    // Support for plain objects
    const object = {
      a,
      // Support for Set
      b: new Set([
        // Support for NaN
        NaN,
        // Support for undefined
        undefined,
        // Support for infinity
        Infinity,
        -Infinity,
      ]),
      c: [
        // Support for signed zeroes
        +0,
        -0,
        null,
      ],
      // Support for Errors
      d: new SyntaxError('This is an error'),
    };

    // Support for recursion
    a.set('recursive', object);

    return object;
  });

  return (
    <div className="SettingsSection">
      <Inspector
        data={exampleData}
      />
    </div>
  );
}

export default function ThemeSettings(): JSX.Element {
  return (
    <div className="SettingsSection">
      <Description
        title="Inspector"
        content="Settings that control the inspector/object viewer."
      />
      <div className="SettingsSection">
        <SelectScheme />
        <ToggleDisplayDataTypes />
        <ToggleDisplayArrayKeys />
        <ToggleQuotesOnKeys />
        <ToggleDisplayObjectSize />
        <InspectorPreview />
      </div>
    </div>
  );
}
