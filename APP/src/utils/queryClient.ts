import { AppState, AppStateStatus } from 'react-native';
import { focusManager, QueryClient } from 'react-query';
import { createAsyncStoragePersistor } from 'react-query/types/createAsyncStoragePersistor-experimental';
import { persistQueryClient } from 'react-query/types/persistQueryClient-experimental';
import AsyncStorage from '@react-native-async-storage/async-storage';

const queryClient = new QueryClient();

const asyncStoragePersistor = createAsyncStoragePersistor({
  storage: AsyncStorage,
});

persistQueryClient({
  queryClient,
  persistor: asyncStoragePersistor,
  maxAge: Infinity,
});

focusManager.setEventListener(handleFocus => {
  const subscription = AppState.addEventListener(
    'change',
    (state: AppStateStatus) => handleFocus(state === 'active'),
  );

  return () => {
    subscription.remove();
  };
});

export default queryClient;
