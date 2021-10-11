const ImageProvider = (imageURL?: string) => (
  <img
    src={'https://api.loca.kimjisub.me/static/icons/ic_' + imageURL + '.svg'}
    alt=""
    style={{
      width: '60px',
      height: '60px',
    }}
  />
);

export default ImageProvider;
