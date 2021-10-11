import AsyncStorage from '@react-native-async-storage/async-storage';
import { AtomEffect, DefaultValue } from 'recoil';

const asyncStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const loadPersisted = async () => {
      const savedValue = await AsyncStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
    };

    loadPersisted();

    onSet(newValue => {
      if (newValue instanceof DefaultValue) {
        AsyncStorage.removeItem(key);
      } else {
        AsyncStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export default asyncStorageEffect;
