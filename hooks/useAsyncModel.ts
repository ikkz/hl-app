import { createModel } from "hox";
import { useEffect, useRef } from "react";
import useDeepCompareEffect from "react-use/lib/useDeepCompareEffect";
import useThrottle from "react-use/lib/useThrottle";
import useMap from "react-use/lib/useMap";

import { useSocketIo } from "./useSocketIO";

interface SyncModel {
  collect: boolean;
  deviceStreaming: boolean;
  buttonLoading: boolean;
  count: number; // 用于同步测试
}

const initSyncModel: SyncModel = {
  collect: false,
  deviceStreaming: false,
  buttonLoading: false,
  count: 0,
};


const TIMEOUT = 1000;

export const useSyncModel = createModel(() => {
  const [syncModel, syncModelActions] = useMap<SyncModel>(initSyncModel);
  const { socket } = useSocketIo();

  const throttledSyncModel = useThrottle(syncModel, TIMEOUT);
  const ignoreEvent = useRef(false);

  useDeepCompareEffect(() => {
    useSocketIo.data?.socket?.emit("hl_event", throttledSyncModel);
    ignoreEvent.current = true;
    setTimeout(() => (ignoreEvent.current = false), TIMEOUT);
    console.log("[syncModel] emit", throttledSyncModel);
  }, [throttledSyncModel]);

  useEffect(() => {
    socket?.on("hl_event", (data) => {
      if (!ignoreEvent.current) {
        console.log("[syncModel] receive", data);
        syncModelActions.setAll(data);
      }
    });
  }, [socket]); //eslint-disable-line react-hooks/exhaustive-deps

  return { syncModel, syncModelActions };
});
