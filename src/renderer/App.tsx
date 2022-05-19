import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { WifiInfo, WIFI_CHANNEL } from 'main/wifi';
import wifiImg from '../../assets/imgs/wifi.png';
import './App.css';

const REFRESH_COUNT = 100;

const Main = () => {
  const [wifiArray, setWifiArray] = useState<WifiInfo[]>([]);
  const [lastIndex, setLastIndex] = useState<number>(REFRESH_COUNT);
  const [loadingMsg, setLoadingMsg] = useState<string>('');
  useEffect(() => {
    setLoadingMsg(' - 로딩중...');
    window.electron.ipcRenderer.once(WIFI_CHANNEL, (arg: WifiInfo[]) => {
      setWifiArray((prevArray) => [...prevArray, ...arg]);
      setLoadingMsg('');
    });
    window.electron.ipcRenderer.sendMessage(WIFI_CHANNEL, [0, REFRESH_COUNT]);
  }, []);

  const getWifiInfo = () => {
    setLoadingMsg(' - 로딩중...');
    window.electron.ipcRenderer.once(WIFI_CHANNEL, (arg: WifiInfo[]) => {
      setWifiArray((prevArray) => [...prevArray, ...arg]);
      setLoadingMsg('');
    });
    window.electron.ipcRenderer.sendMessage(WIFI_CHANNEL, [
      lastIndex,
      REFRESH_COUNT,
    ]);
    setLastIndex((prevIndex) => prevIndex + REFRESH_COUNT);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img width="100rem" alt="icon" src={wifiImg} />
      </div>
      <button type="button" onClick={() => getWifiInfo()}>
        {lastIndex}
        {loadingMsg}
      </button>
      <ul>
        {wifiArray.length > 0 &&
          wifiArray
            .sort((a, b) => (a.ssid > b.ssid ? 1 : -1))
            .map((wifiInfo) => (
              <li key={wifiInfo.ssid} className="wifi-list">
                <span>{wifiInfo.ssid}</span>
                <span> - </span>
                <span>{wifiInfo.password}</span>
              </li>
            ))}
      </ul>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
