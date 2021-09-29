import React from 'react';
import { SvgProps, SvgXml } from 'react-native-svg';
import { useQuery } from 'react-query';
import axios from 'axios';

async function getSvg(icon: string) {
  const { data } = await axios.get(
    `https://api.loca.kimjisub.me/static/icons/ic_${icon}.svg`,
  );
  return data;
}

type LocationIconProps = SvgProps & {
  icon: string;
};

const LocationIcon = (props: LocationIconProps) => {
  const { data } = useQuery(['svg', props.icon], () => getSvg(props.icon), {
    cacheTime: Infinity,
  });
  return <SvgXml {...props} xml={data || null} />;
};

export default LocationIcon;
