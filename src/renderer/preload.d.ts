import { Channels, WifiInfo } from 'main/wifi';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels): void;
        once(channel: Channels, func: (arg: WifiInfo[]) => void): void;
      };
    };
  }
}

export {};
