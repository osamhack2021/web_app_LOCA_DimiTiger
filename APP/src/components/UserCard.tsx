import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';

import { useEditUser, useUser } from '@/api/users';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { colorBlack } from '@/constants/colors';
import { styleDivider } from '@/constants/styles';
import { RootNavigationProp } from '@/Navigators';
import User from '@/types/User';

const UserCard = () => {
  const navigation = useNavigation<RootNavigationProp<'UserScreen'>>();
  const { user } = useUser();
  const editUser = useEditUser();
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});

  useEffect(() => {
    if (!editMode && user) {
      setEditedUser(user);
    }
  }, [user, editMode]);

  return (
    <Card style={styles.container}>
      <View style={styles.cardHeaderContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="chevron-left" size={30} color={colorBlack} />
        </TouchableOpacity>
        <Text style={styles.titleText}>사용자 정보</Text>
        <Button
          style={styles.editButton}
          onPress={() => setEditMode(!editMode)}>
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
          <Button>변경</Button>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {},
  cardHeaderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  backButton: {
    margin: 20,
  },
  titleText: {
    flex: 1,
    fontSize: 21,
    fontWeight: 'bold',
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
});

export default UserCard;
