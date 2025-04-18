import ImageAlphabet from "../ImageAlphabet/ImageAlphabet";
import DictionaryTraduction from "./DictionaryTraduction";

export const Dictionary = () => {
  return (
    <div style={{ display: "flex", height: '85vh' }}>
      <div style={{ width: "50%" }}>
        <DictionaryTraduction />
      </div>
      <div
        style={{
          height: '82vh',
          overflowY: 'scroll',
          overflowX: 'hidden',
          width: "50%",
          padding: "20px",
          backgroundColor: "#CCCCCC",
          border: "2px solid #FFA600",
          borderRadius: "10px",
          margin: "3px",
        }}
      >
        <ImageAlphabet />
      </div>
    </div>
  );
};

export default Dictionary;
