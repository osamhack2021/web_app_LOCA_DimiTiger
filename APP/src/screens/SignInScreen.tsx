import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

import Logo from '@images/loca_logo.svg';

import { authState } from '@/atoms';
import Button from '@/components/Button';
import LocaTextInput from '@/components/LocaTextInput';
import { colorTextInputLabel } from '@/constants/colors';
import { signIn } from '@/utils/AuthUtil';

const SignInScreen = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>();
  const pwRef = useRef<TextInput>(null);
  const setAuth = useSetRecoilState(authState);
  const scale = useSharedValue(1);
  const animatedLogo = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(scale.value) }],
  }));

  const showKeyboard = useCallback(() => {
    scale.value = 0.6;
  }, [scale]);

  const hideKeyboard = useCallback(() => {
    scale.value = 1;
  }, [scale]);

  const authenticate = useCallback(async () => {
    try {
      await signIn(id, password);
      setAuth({
        authenticated: true,
        loading: false,
      });
    } catch (err) {
      let message = '';
      if (axios.isAxiosError(err)) {
        switch (err.response?.status) {
          case 401:
            message = '군번 또는 비밀번호를 확인하세요.';
            break;
          default:
            message = '오류가 발생했습니다.';
        }
      }
      setError(message);
    }
  }, [id, password, setAuth]);

  useEffect(() => {
    const event: 'Will' | 'Did' = Platform.select({
      ios: 'Will',
      default: 'Did',
    });
    const showEvent = Keyboard.addListener(
      `keyboard${event}Show`,
      showKeyboard,
    );
    const hideEvent = Keyboard.addListener(
      `keyboard${event}Hide`,
      hideKeyboard,
    );

    return () => {
      showEvent.remove();
      hideEvent.remove();
    };
  }, [hideKeyboard, showKeyboard]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <Animated.View style={[styles.centerContainer, animatedLogo]}>
          <Logo style={styles.logo} />
        </Animated.View>
        <View style={[styles.container]}>
          <Text style={styles.label}>군번</Text>
          <LocaTextInput
            value={id}
            onChangeText={text => {
              if (text.length === 2) {
                if (id.length === 1) {
                  setId(text + '-');
                } else {
                  setId(text.slice(0, 1));
                }
              } else {
                setId(text);
              }
            }}
            nextInputRef={pwRef}
            autoCapitalize="none"
            keyboardType="number-pad"
            returnKeyType="next"
          />
          <Text style={styles.label}>비밀번호</Text>
          <LocaTextInput
            ref={pwRef}
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={() => authenticate()}
            autoCapitalize="none"
            returnKeyType="done"
            secureTextEntry={true}
          />
          <Text style={styles.errorLabel}>{error}</Text>
          <Button onPress={() => authenticate()} style={styles.loginButton}>
            로그인
          </Button>
        </View>
      </Pressable>
    </KeyboardAvoidingView>
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

export default SignInScreen;
