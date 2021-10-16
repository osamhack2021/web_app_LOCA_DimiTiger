import React, { useMemo } from 'react';
import { View } from 'react-native';
import { SvgProps, SvgXml } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useQuery } from 'react-query';
import axios from 'axios';

import { colorEllipsis } from '@/constants/colors';

async function getSvg(icon: string) {
  const { data } = await axios.get<string>(
    `https://api.loca.kimjisub.me/static/icons/ic_${icon}.svg`,
  );
  return data;
}

type LocationIconProps = SvgProps & {
  icon: string;
};

const LocationIcon = ({ style, ...props }: LocationIconProps) => {
  const { data } = useQuery(['svg', props.icon], () => getSvg(props.icon), {
    cacheTime: Infinity,
  });
  const size = useMemo(
    () =>
      typeof props.height === 'string'
        ? parseInt(props.height, 10)
        : props.height,
    [props.height],
  );
  return (
    <View style={[{ width: size, height: size }, style]}>
      {data ? (
        <SvgXml {...props} xml={data || null} />
      ) : (
        <Icon name="cloud-sync-outline" color={colorEllipsis} size={size} />
      )}
    </View>
  );
};

export default LocationIcon;
