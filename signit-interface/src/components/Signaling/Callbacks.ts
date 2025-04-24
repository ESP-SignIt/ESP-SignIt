import { WebSocketSignaling } from "./WebSocketSignaling";

type SignalingMessage = {
    // type: 'offer' | 'answer' | 'candidate' | string;
    // [key: string]: any;
    type: string;  // e.g., 'offer', 'answer', 'candidate'
    sdp?: string;
    candidate?: RTCIceCandidateInit;
  };

interface Callbacks {
    onConnect?: () => void;
    onDisconnect?: () => void;
    onOffer?: (msg: SignalingMessage) => void;
    onAnswer?: (msg: SignalingMessage) => void;
    onCandidate?: (msg: RTCIceCandidateInit) => void;
    onTrackEvent?: (data: RTCTrackEvent) => void;  // Add this line
    onGotOffer?: (offer: RTCSessionDescriptionInit) => void;
  }