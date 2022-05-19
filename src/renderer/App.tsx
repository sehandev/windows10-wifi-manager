import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { WifiInfo, WIFI_CHANNEL } from 'main/wifi';
import wifiImg from '../../assets/imgs/wifi.png';
import './App.css';

const Main = () => {
  const [wifiArray, setWifiArray] = useState<WifiInfo[]>([]);

  useEffect(() => {
    window.electron.ipcRenderer.once(WIFI_CHANNEL, (arg: WifiInfo[]) => {
      setWifiArray(arg);
    });
    window.electron.ipcRenderer.sendMessage(WIFI_CHANNEL);
  }, []);
  return (
    <>
      <div>
        <img width="100rem" alt="icon" src={wifiImg} />
      </div>
      <ul>
        {wifiArray.map((wifiInfo) => (
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
