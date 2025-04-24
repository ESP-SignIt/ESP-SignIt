// WebSocketSignaling.ts
type SignalingMessage = {
    // type: 'offer' | 'answer' | 'candidate' | string;
    // [key: string]: any;
    type: string;  // e.g., 'offer', 'answer', 'candidate'
    sdp?: string;
    candidate?: RTCIceCandidateInit;
  };
  
  type Callbacks = {
    onConnect?: () => void;
    onDisconnect?: () => void;
    onOffer?: (msg: SignalingMessage) => void;
    onAnswer?: (msg: SignalingMessage) => void;
    onCandidate?: (msg: SignalingMessage) => void;
    onTrackEvent?: (data: RTCTrackEvent) => void;  // Add this line
    onGotOffer?: (offer: RTCSessionDescriptionInit) => void;
  };
  
  export class WebSocketSignaling {
    private socket: WebSocket;
  
    constructor(url: string, callbacks: Callbacks = {}) {
      this.socket = new WebSocket(url);
  
      this.socket.onopen = () => {
        console.log("WebSocket connected");
        callbacks.onConnect?.();
      };
  
      this.socket.onmessage = (event: MessageEvent) => {
        const message: SignalingMessage = JSON.parse(event.data);
        
        switch (message.type) {
          case 'offer':
            callbacks.onOffer?.(message);
            break;
          case 'answer':
            callbacks.onAnswer?.(message);
            break;
          case 'candidate':
            callbacks.onCandidate?.(message);
            break;
          default:
            console.warn('Unhandled message type:', message.type);
        }
      };
  
      this.socket.onclose = () => {
        console.log("WebSocket closed");
        callbacks.onDisconnect?.();
      };
    }
  
    send(message: SignalingMessage) {
      this.socket.send(JSON.stringify(message));
    }
  
    close() {
      this.socket.close();
    }
  }