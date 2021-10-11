import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import axios from 'axios';

import Logo from '@assets/images/loca_logo.svg';

import Button from '@/components/Button';
import ControlledTextInput from '@/components/ControlledTextInput';
import Text from '@/components/Text';
import { colorTextInputLabel } from '@/constants/colors';
import useSignIn from '@/hooks/useSignIn';

const SignInScreen = () => {
  const { control, handleSubmit } =
    useForm<{ serial: string; password: string }>();
  const signIn = useSignIn();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const pwRef = useRef<TextInput>(null);
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

  const authenticate = useCallback(
    async ({ serial, password }) => {
      setLoading(true);
      try {
        await signIn(serial, password);
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
        setLoading(false);
      }
    },
    [signIn],
  );

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
          <ControlledTextInput
            control={control}
            name="serial"
            nextInputRef={pwRef}
            autoCapitalize="none"
            returnKeyType="next"
            rules={{
              required: {
                value: true,
                message: '군번을 입력하세요.',
              },
              pattern: {
                value: /\d{2}-\d{6,8}/,
                message: '군번 형식이 올바르지 않습니다.',
              },
            }}
          />
          <Text style={styles.label}>비밀번호</Text>
          <ControlledTextInput
            control={control}
            name="password"
            ref={pwRef}
            onSubmitEditing={handleSubmit(authenticate)}
            autoCapitalize="none"
            returnKeyType="done"
            secureTextEntry={true}
            rules={{
              required: {
                value: true,
                message: '비밀번호를 입력하세요.',
              },
            }}
          />
          <Text style={styles.errorLabel}>{error}</Text>
          <Button
            loading={loading}
            onPress={handleSubmit(authenticate)}
            style={styles.loginButton}>
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
