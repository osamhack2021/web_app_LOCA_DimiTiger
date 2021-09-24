import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Keyboard,
  KeyboardEvent,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '@images/loca_logo.svg';

import { useAuth } from '@/api/auth';
import Button from '@/components/Button';
import {
  colorButton,
  colorTextInput,
  colorTextInputLabel,
} from '@/constants/colors';

const ANIMATION_DURATION = 300;

const AuthScreen = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [idFocused, setIdFocused] = useState(false);
  const [pwFocused, setPwFocused] = useState(false);
  const logoViewScale = useRef(new Animated.Value(1)).current;
  const keyboardHeight = useRef(new Animated.Value(0)).current;
  const { loading, error, signIn } = useAuth();

  const showKeyboard = useCallback(
    (e: KeyboardEvent) => {
      Animated.timing(logoViewScale, {
        toValue: 0.6,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }).start();
      Animated.timing(keyboardHeight, {
        toValue: -e.endCoordinates.height / 2,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }).start();
    },
    [keyboardHeight, logoViewScale],
  );

  const hideKeyboard = useCallback(() => {
    Animated.timing(logoViewScale, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
    Animated.timing(keyboardHeight, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  }, [keyboardHeight, logoViewScale]);

  useEffect(() => {
    const showEvent = Keyboard.addListener('keyboardWillShow', showKeyboard);
    const hideEvent = Keyboard.addListener('keyboardWillHide', hideKeyboard);

    return () => {
      showEvent.remove();
      hideEvent.remove();
    };
  }, [hideKeyboard, showKeyboard]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.centerContainer,
          {
            transform: [
              { scale: logoViewScale },
              { translateY: keyboardHeight },
            ],
          },
        ]}>
        <Logo style={styles.logo} />
      </Animated.View>
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateY: keyboardHeight }] },
        ]}>
        <Text style={styles.label}>군번</Text>
        <TextInput
          value={id}
          onChangeText={setId}
          onFocus={() => setIdFocused(true)}
          onBlur={() => setIdFocused(false)}
          autoCapitalize="none"
          style={[
            styles.textInput,
            idFocused ? styles.textInputFocus : styles.textInputBlur,
          ]}
        />
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          onFocus={() => setPwFocused(true)}
          onBlur={() => setPwFocused(false)}
          style={[
            styles.textInput,
            pwFocused ? styles.textInputFocus : styles.textInputBlur,
          ]}
        />
        <Text style={styles.errorLabel}>{error}</Text>
        <Button onPress={() => signIn(id, password)} style={styles.loginButton}>
          로그인
        </Button>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    maxHeight: 150,
  },
  label: {
    color: colorTextInputLabel,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textInput: {
    backgroundColor: colorTextInput,
    borderRadius: 5,
    borderWidth: 2,
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 20,
    padding: 10,
  },
  textInputFocus: {
    borderColor: colorButton,
  },
  textInputBlur: {
    borderColor: colorTextInput,
  },
  errorLabel: {
    color: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  loginButton: {
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default AuthScreen;
