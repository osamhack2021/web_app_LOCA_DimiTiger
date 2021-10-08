import React, {
  ForwardedRef,
  ReactElement,
  RefAttributes,
  useState,
} from 'react';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import Animated, { SequencedTransition } from 'react-native-reanimated';

import Text from '@/components/Text';
import { colorTextInputLabel } from '@/constants/colors';
import {
  styleTextInput,
  styleTextInputBlur,
  styleTextInputFocus,
} from '@/constants/styles';

type ControlledTextInputProps<T extends FieldValues> = Omit<
  ControllerProps<T>,
  'render'
> &
  Omit<TextInputProps, 'value' | 'onChangeText'> & {
    label?: string;
    nextInputRef?: React.RefObject<TextInput>;
    transform?: (value: string) => string;
  };

const ControlledTextInput = <T extends FieldValues>(
  props: ControlledTextInputProps<T>,
  ref: ForwardedRef<TextInput>,
) => {
  const [focused, setFocused] = useState(false);
  const {
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
    label,
    nextInputRef,
    transform,
    ...textInputProps
  } = props;
  const controllerProps = {
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  };
  return (
    <Controller
      {...controllerProps}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <Animated.View layout={SequencedTransition.reverse()}>
          {label && <Text style={styles.label}>{label}</Text>}
          <TextInput
            {...textInputProps}
            ref={ref}
            value={value}
            onChangeText={text =>
              transform ? onChange(transform(text)) : onChange(text)
            }
            onFocus={e => {
              setFocused(true);
              if (textInputProps.onFocus) {
                textInputProps.onFocus(e);
              }
            }}
            onBlur={e => {
              setFocused(false);
              onBlur();
              if (textInputProps.onBlur) {
                textInputProps.onBlur(e);
              }
            }}
            onSubmitEditing={e => {
              if (nextInputRef) {
                nextInputRef.current?.focus();
              }
              if (textInputProps.onSubmitEditing) {
                textInputProps.onSubmitEditing(e);
              }
            }}
            blurOnSubmit={nextInputRef ? false : true}
            returnKeyType={
              textInputProps.returnKeyType ||
              (nextInputRef ? 'next' : 'default')
            }
            autoCapitalize="none"
            style={[
              styleTextInput,
              focused ? styleTextInputFocus : styleTextInputBlur,
              textInputProps.style,
            ]}
          />
          {error && (
            <Text style={styles.errorMessage}>
              {/*@ts-ignore*/}
              {error.message}
            </Text>
          )}
        </Animated.View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  label: {
    color: colorTextInputLabel,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  errorMessage: {
    color: 'red',
    marginStart: 20,
    marginTop: 5,
  },
});

export default React.forwardRef(ControlledTextInput) as <T extends FieldValues>(
  props: ControlledTextInputProps<T> & RefAttributes<TextInput>,
) => ReactElement;
