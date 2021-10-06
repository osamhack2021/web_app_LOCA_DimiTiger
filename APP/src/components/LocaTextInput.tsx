import React, { useState } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

import {
  styleTextInput,
  styleTextInputBlur,
  styleTextInputFocus,
} from '@/constants/styles';

type TextInputProps = RNTextInputProps & {
  nextInputRef?: React.RefObject<RNTextInput>;
};

const TextInput = React.forwardRef<RNTextInput, TextInputProps>(
  (props, ref) => {
    const [focused, setFocused] = useState(false);
    return (
      <RNTextInput
        {...props}
        ref={ref}
        onFocus={e => {
          setFocused(true);
          if (props.onFocus) {
            props.onFocus(e);
          }
        }}
        onBlur={e => {
          setFocused(false);
          if (props.onBlur) {
            props.onBlur(e);
          }
        }}
        onSubmitEditing={e => {
          if (props.nextInputRef) {
            props.nextInputRef.current?.focus();
          }
          if (props.onSubmitEditing) {
            props.onSubmitEditing(e);
          }
        }}
        blurOnSubmit={props.nextInputRef ? false : true}
        returnKeyType={
          props.returnKeyType || (props.nextInputRef ? 'next' : 'default')
        }
        style={[
          styleTextInput,
          focused ? styleTextInputFocus : styleTextInputBlur,
          props.style,
        ]}
      />
    );
  },
);

export default TextInput;
