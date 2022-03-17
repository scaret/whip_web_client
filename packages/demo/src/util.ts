export async function watch(channelUrl, video) {
  if (channelUrl) {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    });
    peer.oniceconnectionstatechange = () => console.log(`[Preview] ICE connection state: ${peer.iceConnectionState}`);
    peer.onicecandidate = async (event) => {
      if (event.candidate === null) {
        const response = await fetch(channelUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ sdp: peer.localDescription.sdp })
        });
        const { sdp } = await response.json();
        peer.setRemoteDescription({ type: "answer", sdp: sdp });    
      }
    }
    peer.ontrack = (ev) => {
      if (ev.streams && ev.streams[0]) {
        video.srcObject = ev.streams[0];
      }
    };

    const sdpOffer = await peer.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    peer.setLocalDescription(sdpOffer);

  }
}