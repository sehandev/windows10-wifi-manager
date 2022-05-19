export type Channels = 'ipc-wifi';
export const WIFI_CHANNEL = 'ipc-wifi';
export type WifiInfo = {
  ssid: string;
  password: string;
};

export const getWifiArray: () => WifiInfo[] = () => {
  const wifiArray: WifiInfo[] = [
    { ssid: 'wifi1', password: 'abcd' },
    { ssid: 'wifi2', password: 'abcd' },
    { ssid: 'wifi3', password: 'abcd' },
  ];
  return wifiArray;
};
