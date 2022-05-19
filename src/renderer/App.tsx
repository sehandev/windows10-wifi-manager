import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

type WifiArray = {
  ssid: string;
  password: string;
};

const Main = () => {
  const wifiArray: WifiArray[] = [
    { ssid: 'wifi1', password: 'abcd' },
    { ssid: 'wifi2', password: 'abcd' },
    { ssid: 'wifi3', password: 'abcd' },
  ];

  return (
    <>
      <div>
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1 id="title">Wifi List</h1>
      <ul>
        {wifiArray.map((wifiInfo) => (
          <li className="wifi-list">
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
