import * as React from "react";
import { StyleSheet, View } from "react-native";
import { StartScan } from "../components/StartScan";
import { useSocketIo } from "../hooks/useSocketIO";
import { Text, Button } from "react-native-elements";
import { useSyncModel } from "../hooks/useAsyncModel";

export default function TabOneScreen() {
  const { deviceConnected, socket, initSocket } = useSocketIo();
  const { syncModel, syncModelActions } = useSyncModel();
  return deviceConnected ? (
    <View style={styles.page}>
      <Button onPress={() => socket?.close()} title="取消连接" />
      <Button loading={syncModel.buttonLoading} title="开始识别" />
    </View>
  ) : (
    <StartScan onToken={initSocket} />
  );
}

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
