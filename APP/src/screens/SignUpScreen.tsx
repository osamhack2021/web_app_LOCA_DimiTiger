import React, { useRef } from 'react';
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

import Button from '@/components/Button';
import ControlledTextInput from '@/components/ControlledTextInput';
import Text from '@/components/Text';
import { colorBlack, colorTextInputLabel } from '@/constants/colors';
import { RootNavigationProp } from '@/Navigators';
import RegisterData from '@/types/RegisterData';

const SignUpScreen = () => {
  const navigation = useNavigation<RootNavigationProp<'SignUp'>>();
  const nameRef = useRef<TextInput>(null);
  const codeRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const reEnterRef = useRef<TextInput>(null);
  const { control, handleSubmit, getValues } = useForm<
    RegisterData & { pwCheck: string }
  >({
    mode: 'onBlur',
  });

  async function onSubmit(data: RegisterData & { pwCheck?: string }) {
    delete data.pwCheck;
    console.log(data);
    try {
      //await registerUser(data);
    } catch {}
  }

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
          <Text style={styles.label}>군번</Text>
          <ControlledTextInput
            control={control}
            name="identity.serial"
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
          <Text style={styles.label}>이름</Text>
          <ControlledTextInput
            control={control}
            name="identity.name"
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
          <Text style={styles.label}>가입코드</Text>
          <ControlledTextInput
            control={control}
            name="identity.password"
            ref={codeRef}
            nextInputRef={phoneRef}
            rules={{
              required: {
                value: true,
                message: '가입코드를 입력하세요.',
              },
            }}
          />
          <Text style={styles.label}>전화번호</Text>
          <ControlledTextInput
            control={control}
            name="register.phone"
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
          <Text style={styles.label}>이메일</Text>
          <ControlledTextInput
            control={control}
            name="register.email"
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
          <Text style={styles.label}>비밀번호</Text>
          <ControlledTextInput
            control={control}
            name="register.password"
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
          <Text style={styles.label}>비밀번호 확인</Text>
          <ControlledTextInput
            control={control}
            name="pwCheck"
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
          <Button onPress={handleSubmit(onSubmit)} style={styles.loginButton}>
            등록
          </Button>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  label: {
    color: colorTextInputLabel,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
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
