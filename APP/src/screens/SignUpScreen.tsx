<<<<<<< HEAD
import React, { useRef } from 'react';
=======
import React, { useCallback, useRef, useState } from 'react';
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
import { useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';
<<<<<<< HEAD

import { registerUser } from '@/api/users';
=======
import { AxiosResponse } from 'axios';

>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
import Button from '@/components/Button';
import ControlledTextInput from '@/components/ControlledTextInput';
import Text from '@/components/Text';
import { colorBlack } from '@/constants/colors';
<<<<<<< HEAD
import { RootNavigationProp } from '@/Navigators';
import RegisterData from '@/types/RegisterData';
import { signIn } from '@/utils/AuthUtil';

const SignUpScreen = () => {
  const navigation = useNavigation<RootNavigationProp<'SignUp'>>();
=======
import useAxios from '@/hooks/useAxios';
import useSignIn from '@/hooks/useSignIn';
import { RootNavigationProp } from '@/Navigators';
import RegisterData from '@/types/RegisterData';
import User from '@/types/User';

const SignUpScreen = () => {
  const navigation = useNavigation<RootNavigationProp<'SignUp'>>();
  const axios = useAxios();
  const signIn = useSignIn();
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
  const nameRef = useRef<TextInput>(null);
  const codeRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const reEnterRef = useRef<TextInput>(null);
<<<<<<< HEAD
  const { control, handleSubmit, getValues } = useForm<
    RegisterData & { pwCheck: string }
  >({
    mode: 'onBlur',
  });

  async function onSubmit(data: RegisterData & { pwCheck?: string }) {
    delete data.pwCheck;
    try {
      const user = await registerUser(data);
      await signIn(data.identity.serial, data.register.password);

      navigation.navigate('RegisterDone', {
        user,
      });
    } catch (err) {
      console.log(err);
    }
  }
=======
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, getValues } = useForm<
    RegisterData & { pwCheck: string }
  >();

  const onSubmit = useCallback(
    async (data: RegisterData & { pwCheck?: string }) => {
      setLoading(true);
      delete data.pwCheck;
      try {
        const user = (
          await axios.post<RegisterData, AxiosResponse<User>>(
            '/users/register',
            data,
          )
        ).data;
        await signIn(data.identity.serial, data.register.password);

        navigation.navigate('RegisterDone', {
          user,
        });
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    },
    [axios, navigation, signIn],
  );
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>사용자 등록</Text>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => navigation.goBack()}>
              <Icon name="close" size={30} color={colorBlack} />
            </TouchableOpacity>
          </View>
          <ControlledTextInput
            control={control}
            name="identity.serial"
            label="군번"
            nextInputRef={nameRef}
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
          <ControlledTextInput
            control={control}
            name="identity.name"
            label="이름"
            ref={nameRef}
            nextInputRef={codeRef}
            autoCompleteType="name"
            textContentType="name"
            rules={{
              required: {
                value: true,
                message: '이름을 입력하세요.',
              },
            }}
          />
          <ControlledTextInput
            control={control}
            name="identity.password"
            label="가입코드"
            ref={codeRef}
            nextInputRef={phoneRef}
            rules={{
              required: {
                value: true,
                message: '가입코드를 입력하세요.',
              },
            }}
          />
          <ControlledTextInput
            control={control}
            name="register.phone"
            label="전화번호"
            ref={phoneRef}
            nextInputRef={emailRef}
            keyboardType="phone-pad"
            autoCompleteType="tel"
            textContentType="telephoneNumber"
            rules={{
              required: {
                value: true,
                message: '전화번호를 입력하세요.',
              },
              pattern: {
                value: /\d{8,11}/,
                message: '8-11자리의 숫자만 입력해주세요.',
              },
            }}
          />
          <ControlledTextInput
            control={control}
            name="register.email"
            label="이메일"
            ref={emailRef}
            nextInputRef={passwordRef}
            keyboardType="email-address"
            autoCompleteType="email"
            textContentType="emailAddress"
            rules={{
              required: {
                value: true,
                message: '이메일을 입력하세요.',
              },
            }}
          />
          <ControlledTextInput
            control={control}
            name="register.password"
            label="비밀번호"
            ref={passwordRef}
            nextInputRef={reEnterRef}
            secureTextEntry={true}
            rules={{
              required: {
                value: true,
                message: '비밀번호를 입력하세요.',
              },
            }}
          />
          <ControlledTextInput
            control={control}
            name="pwCheck"
            label="비밀번호 확인"
            ref={reEnterRef}
            secureTextEntry={true}
            onSubmitEditing={handleSubmit(onSubmit)}
            returnKeyType="done"
            rules={{
              required: {
                value: true,
                message: '비밀번호를 다시 입력하세요.',
              },
              validate: {
                isSame: v =>
                  v === getValues('register.password') ||
                  '비밀번호가 일치하지 않습니다.',
              },
            }}
          />
<<<<<<< HEAD
          <Button onPress={handleSubmit(onSubmit)} style={styles.loginButton}>
=======
          <Button
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            style={styles.loginButton}>
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
            등록
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
