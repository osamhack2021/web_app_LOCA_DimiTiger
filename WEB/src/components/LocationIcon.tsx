import React, { DetailedHTMLProps } from 'react';

type LocationIconProps = DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLElement>,
  HTMLImageElement
> & {
  icon?: string;
};

const LocationIcon = ({ icon, ...props }: LocationIconProps) => (
  <img
    src={'https://api.loca.kimjisub.me/static/icons/ic_' + icon + '.svg'}
    alt=""
    style={{
      width: '60px',
      height: '60px',
    }}
    {...props}
  />
);

export default LocationIcon;
