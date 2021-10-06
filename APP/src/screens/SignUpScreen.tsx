import React, { useRef } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';

import Button from '@/components/Button';
import LocaTextInput from '@/components/LocaTextInput';
import { colorBlack, colorTextInputLabel } from '@/constants/colors';
import { RootNavigationProp } from '@/Navigators';

const SignUpScreen = () => {
  const navigation = useNavigation<RootNavigationProp<'SignUp'>>();
  const nameRef = useRef<TextInput>(null);
  const codeRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const reEnterRef = useRef<TextInput>(null);
  const { top } = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>공지사항</Text>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => navigation.goBack()}>
              <Icon name="close" size={30} color={colorBlack} />
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>군번</Text>
          <LocaTextInput nextInputRef={nameRef} />
          <Text style={styles.label}>이름</Text>
          <LocaTextInput ref={nameRef} nextInputRef={codeRef} />
          <Text style={styles.label}>가입코드</Text>
          <LocaTextInput ref={codeRef} nextInputRef={phoneRef} />
          <Text style={styles.label}>전화번호</Text>
          <LocaTextInput ref={phoneRef} nextInputRef={emailRef} />
          <Text style={styles.label}>이메일</Text>
          <LocaTextInput ref={emailRef} nextInputRef={passwordRef} />
          <Text style={styles.label}>비밀번호</Text>
          <LocaTextInput ref={passwordRef} nextInputRef={reEnterRef} />
          <Text style={styles.label}>비밀번호 확인</Text>
          <LocaTextInput ref={reEnterRef} />
          <Button onPress={() => {}} style={styles.loginButton}>
            로그인
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
