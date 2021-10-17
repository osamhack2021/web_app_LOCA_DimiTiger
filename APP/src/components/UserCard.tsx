import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { useEditUser, useMe } from '@/api/users';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Text from '@/components/Text';
import { colorSignOut } from '@/constants/colors';
import { styleCardHeaderContainer, styleDivider } from '@/constants/styles';
import useSignOut from '@/hooks/useSignOut';
import User from '@/types/User';

const UserCard = () => {
  const { data: user } = useMe();
  const editUser = useEditUser();
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const [patchLoading, setPatchLoading] = useState(false);
  const signOut = useSignOut();

  const toggleMode = useCallback(async () => {
    if (editMode) {
      setPatchLoading(true);
      await editUser.mutateAsync(editedUser);
      setPatchLoading(false);
    }

    setEditMode(!editMode);
  }, [editMode, editUser, editedUser]);

  useEffect(() => {
    if (!editMode && user) {
      setEditedUser({
        phone: user.phone,
        email: user.email,
        rank: user.rank,
      });
    }
  }, [user, editMode]);

  return (
    <Card style={styles.container}>
      <View style={styleCardHeaderContainer}>
        <Text style={styles.titleText}>사용자 정보</Text>
        <Button
          style={styles.editButton}
          onPress={toggleMode}
          loading={patchLoading}>
          {editMode ? '완료' : '수정'}
        </Button>
      </View>
      <View style={styleDivider} />
      <View style={styles.userContainer}>
        <View style={styles.userItem}>
          <Text>군번</Text>
          <Text style={styles.dataText}>{user?.serial}</Text>
        </View>
        <View style={styleDivider} />
        <View style={styles.userItem}>
          <Text>이름</Text>
          <Text style={styles.dataText}>{user?.name}</Text>
        </View>
        <View style={styleDivider} />
        <View style={styles.userItem}>
          <Text>계급</Text>
          <Text style={styles.dataText}>{user?.rank}</Text>
        </View>
        <View style={styleDivider} />
        <View style={styles.userItem}>
          <Text>전화번호</Text>
          {editMode ? (
            <TextInput
              value={editedUser.phone}
              onChangeText={text => setEditedUser(e => ({ ...e, phone: text }))}
            />
          ) : (
            <Text style={styles.dataText}>{user?.phone}</Text>
          )}
        </View>
        <View style={styleDivider} />
        <View style={styles.userItem}>
          <Text>이메일</Text>
          {editMode ? (
            <TextInput
              value={editedUser.email}
              onChangeText={text => setEditedUser(e => ({ ...e, email: text }))}
            />
          ) : (
            <Text style={styles.dataText}>{user?.email}</Text>
          )}
        </View>
        <View style={styleDivider} />
        <View style={styles.userItem}>
          <Text>비밀번호</Text>
          <Button onPress={() => {}}>변경</Button>
        </View>
        <View style={styles.signOutContainer}>
          <Button onPress={() => signOut()} style={styles.signOutButton}>
            로그아웃
          </Button>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  backButton: {
    margin: 20,
  },
  titleText: {
    flex: 1,
    fontSize: 21,
    fontWeight: 'bold',
    margin: 20,
  },
  editButton: {
    marginEnd: 20,
  },
  userContainer: {
    padding: 20,
  },
  userItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  dataText: {
    fontWeight: 'bold',
  },
  signOutContainer: {
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: colorSignOut,
    shadowColor: colorSignOut,
  },
});

export default UserCard;
