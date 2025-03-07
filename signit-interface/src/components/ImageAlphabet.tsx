import A from '../assets/alphabet/A.png';
import B from '../assets/alphabet/B.png';
import C from '../assets/alphabet/C.png';
import D from '../assets/alphabet/D.png';
import E from '../assets/alphabet/E.png';
import F from '../assets/alphabet/F.png';
import G from '../assets/alphabet/G.png';
import H from '../assets/alphabet/H.png';
import I from '../assets/alphabet/I.png';
import J from '../assets/alphabet/J.png';
import K from '../assets/alphabet/K.png';
import L from '../assets/alphabet/L.png';
import M from '../assets/alphabet/M.png';
import N from '../assets/alphabet/N.png';
import O from '../assets/alphabet/O.png';
import P from '../assets/alphabet/P.png';
import Q from '../assets/alphabet/Q.png';
import R from '../assets/alphabet/R.png';
import S from '../assets/alphabet/S.png';
import T from '../assets/alphabet/T.png';
import U from '../assets/alphabet/U.png';
import V from '../assets/alphabet/V.png';
import W from '../assets/alphabet/W.png';
import X from '../assets/alphabet/X.png';
import Y from '../assets/alphabet/Y.png';

const imagesList = [
    { id: 1, src: A, alt: "Letter A" },
    { id: 2, src: B, alt: "Letter B" },
    { id: 3, src: C, alt: "Letter C" },
    { id: 4, src: D, alt: "Letter D" },
    { id: 5, src: E, alt: "Letter E" },
    { id: 6, src: F, alt: "Letter F" },
    { id: 7, src: G, alt: "Letter G" },
    { id: 8, src: H, alt: "Letter H" },
    { id: 9, src: I, alt: "Letter I" },
    { id: 10, src: J, alt: "Letter J" },
    { id: 11, src: K, alt: "Letter K" },
    { id: 12, src: L, alt: "Letter L" },
    { id: 13, src: M, alt: "Letter M" },
    { id: 14, src: N, alt: "Letter N" },
    { id: 15, src: O, alt: "Letter O" },
    { id: 16, src: P, alt: "Letter P" },
    { id: 17, src: Q, alt: "Letter Q" },
    { id: 18, src: R, alt: "Letter R" },
    { id: 19, src: S, alt: "Letter S" },
    { id: 20, src: T, alt: "Letter T" },
    { id: 21, src: U, alt: "Letter U" },
    { id: 22, src: V, alt: "Letter V" },
    { id: 23, src: W, alt: "Letter W" },
    { id: 24, src: X, alt: "Letter X" },
    { id: 25, src: Y, alt: "Letter Y" },
    { id: 25, src: Y, alt: "Letter Z" },
  ];

  function ImageAlphabet() {
    return (
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center'}}>
        {imagesList.map((image) => (
          <img key={image.id} src={image.src} alt={image.alt} style={{margin: '4px'}}/>
        ))}
      </div>
    );
  }
  
  export default ImageAlphabet;