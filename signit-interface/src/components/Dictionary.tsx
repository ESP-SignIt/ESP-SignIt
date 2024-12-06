import ImageAlphabet from "./ImageAlphabet";
import Traduction from "./Traduction";

export const Dictionary = () => {

    return (
        <div style={{ display: 'flex' }}>
      <div style={{ width: '50%', padding: '20px' }}>
        <Traduction />
      </div>
      <div style={{ width: '50%', padding: '20px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '10px', margin: '3px'  }}>
        <ImageAlphabet/>
      </div>
    </div>
    );
};

export default Dictionary;