import imageList, { ImageList } from "./imageList";

function ImageAlphabet() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center' }}>
      {imageList.map((image: ImageList) => (
        <img key={image.id} src={image.src} alt={image.alt} style={{ margin: '4px' }} />
      ))}
    </div>
  );
}

export default ImageAlphabet;