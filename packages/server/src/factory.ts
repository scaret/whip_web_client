import { WHIPResource } from "./models/WHIPResource";
import { WRTCBroadcaster } from "./wrtc/broadcaster";
import { WRTCDummy } from "./wrtc/dummy";

export const createWHIPResourceFromType = (type: string, sdpOffer: string) => {
  switch (type) {
    case "dummy":
      return new WRTCDummy(sdpOffer);
    case "broadcaster":
      return new WRTCBroadcaster(sdpOffer);
    default:
      throw new Error(`Failed to create resource, reason: Invalid resource type '${type}'`);
  }
}