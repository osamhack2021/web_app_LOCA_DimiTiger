import { useRecoilValue } from 'recoil';

import { currentBeaconState } from '@/atoms';

const useCurrentBeacon = () => {
  const currentBeacon = useRecoilValue(currentBeaconState);
  return currentBeacon;
};

export default useCurrentBeacon;
