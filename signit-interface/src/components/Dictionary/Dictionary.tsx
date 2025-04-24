/**
 * Dictionary Component
 * 
 * This component serves as a container for the dictionary functionality,
 * displaying both the dictionary translation interface and the image alphabet
 * side by side in a split-screen layout.
 */

import ImageAlphabet from "../ImageAlphabet/ImageAlphabet";
import DictionaryTraduction from "./DictionaryTraduction";

/**
 * Dictionary Component
 * 
 * Creates a split-screen layout with the dictionary translation interface
 * on the left side and the image alphabet reference on the right side.
 * The component provides a comprehensive view for users to both practice
 * sign language and reference the alphabet.
 * 
 * @returns {JSX.Element} A split-screen layout with dictionary and alphabet components
 */
export const Dictionary = () => {
  return (
    // Main container with flex layout and fixed height
    <div style={{ display: "flex", height: '85vh' }}>
      {/* Left side: Dictionary translation interface */}
      <div style={{ width: "50%" }}>
        <DictionaryTraduction />
      </div>
      {/* Right side: Image alphabet reference with custom styling */}
      <div
        style={{
          height: '82vh',
          overflowY: 'scroll', // Enable vertical scrolling for overflow content
          overflowX: 'hidden', // Hide horizontal overflow
          width: "50%",
          padding: "20px",
          backgroundColor: "#CCCCCC", // Light gray background
          border: "2px solid #FFA600", // Orange border
          borderRadius: "10px", // Rounded corners
          margin: "3px",
        }}
      >
        <ImageAlphabet />
      </div>
    </div>
  );
};

export default Dictionary;
