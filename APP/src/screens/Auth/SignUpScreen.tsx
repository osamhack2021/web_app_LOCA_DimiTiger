import React, { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';
import { AxiosResponse } from 'axios';
import axioss from 'axios';
import { useSetRecoilState } from 'recoil';

import { registerState } from '@/atoms';
import Button from '@/components/Button';
import ControlledTextInput from '@/components/ControlledTextInput';
import Text from '@/components/Text';
import { colorBlack } from '@/constants/colors';
import useAxios from '@/hooks/useAxios';
import useSignIn from '@/hooks/useSignIn';
import { RootNavigationProp } from '@/Navigators';
import RegisterData from '@/types/RegisterData';
import User from '@/types/User';

const SignUpScreen = () => {
  const navigation = useNavigation<RootNavigationProp<'SignUp'>>();
  const axios = useAxios();
  const signIn = useSignIn();
  const nameRef = useRef<TextInput>(null);
  const codeRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const reEnterRef = useRef<TextInput>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, getValues } = useForm<
    RegisterData & { pwCheck: string }
  >();
  const setRegisterState = useSetRecoilState(registerState);

  const onSubmit = useCallback(
    async (registerData: RegisterData & { pwCheck?: string }) => {
      setLoading(true);
      delete registerData.pwCheck;
      try {
        const { data } = await axios.post<RegisterData, AxiosResponse<User>>(
          '/users/register',
          registerData,
        );

        setRegisterState({
          isRegistering: true,
          name: data.name,
          rank: data.rank,
        });

        await signIn(
          registerData.identity.serial,
          registerData.register.password,
        );
      } catch (err) {
        setLoading(false);
        let message = '';
        if (axioss.isAxiosError(err)) {
          switch (err.response?.status) {
            case 409:
              message = '?????? ?????? ??????????????? ???????????????.';
              break;
            default:
              message = '????????? ??????????????????.';
          }
        }
        setError(message);
      }
    },
    [axios, setRegisterState, signIn],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>????????? ??????</Text>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => navigation.goBack()}>
              <Icon name="close" size={30} color={colorBlack} />
            </TouchableOpacity>
          </View>
          <ControlledTextInput
            control={control}
            name="identity.serial"
            label="??????"
            nextInputRef={nameRef}
            rules={{
              required: {
                value: true,
                message: '????????? ???????????????.',
              },
              pattern: {
                value: /\d{2}-\d{6,8}/,
                message: '?????? ????????? ???????????? ????????????.',
              },
            }}
          />
          <ControlledTextInput
            control={control}
            name="identity.name"
            label="??????"
            ref={nameRef}
            nextInputRef={codeRef}
            autoCompleteType="name"
            textContentType="name"
            rules={{
              required: {
                value: true,
                message: '????????? ???????????????.',
              },
            }}
          />
          <ControlledTextInput
            control={control}
            name="identity.password"
            label="????????????"
            ref={codeRef}
            nextInputRef={phoneRef}
            rules={{
              required: {
                value: true,
                message: '??????????????? ???????????????.',
              },
            }}
          />
          <ControlledTextInput
            control={control}
            name="register.phone"
            label="????????????"
            ref={phoneRef}
            nextInputRef={emailRef}
            keyboardType="phone-pad"
            autoCompleteType="tel"
            textContentType="telephoneNumber"
            rules={{
              required: {
                value: true,
                message: '??????????????? ???????????????.',
              },
              pattern: {
                value: /\d{8,11}/,
                message: '8-11????????? ????????? ??????????????????.',
              },
            }}
          />
          <ControlledTextInput
            control={control}
            name="register.email"
            label="?????????"
            ref={emailRef}
            nextInputRef={passwordRef}
            keyboardType="email-address"
            autoCompleteType="email"
            textContentType="emailAddress"
            rules={{
              required: {
                value: true,
                message: '???????????? ???????????????.',
              },
            }}
          />
          <ControlledTextInput
            control={control}
            name="register.password"
            label="????????????"
            ref={passwordRef}
            nextInputRef={reEnterRef}
            secureTextEntry={true}
            rules={{
              required: {
                value: true,
                message: '??????????????? ???????????????.',
              },
            }}
          />
          <ControlledTextInput
            control={control}
            name="pwCheck"
            label="???????????? ??????"
            ref={reEnterRef}
            secureTextEntry={true}
            onSubmitEditing={handleSubmit(onSubmit)}
            returnKeyType="done"
            rules={{
              required: {
                value: true,
                message: '??????????????? ?????? ???????????????.',
              },
              validate: {
                isSame: v =>
                  v === getValues('register.password') ||
                  '??????????????? ???????????? ????????????.',
              },
            }}
          />
          <Text>{error}</Text>
          <Button
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            style={styles.loginButton}>
            ??????
          </Button>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20,
  },
  closeIcon: {
    margin: 20,
  },
  loginButton: {
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default SignUpScreen;
