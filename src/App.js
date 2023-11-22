import './App.css';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [ts, setTs] = useState('3h');
  const [temp, setTemp] = useState('1');
  const srcIframe = 'http://localhost:3000/myd-solo/f58a5185-dc3e-442b-8dbf-16e63f938354/new-dashboard?orgId=1&var-ts=3h&panelId=1';
  useEffect(() => {
    const sendMessageToGrafana = () => {
      const message = [
        { key: "ts", value: ts },
        { key: "temp", value: ts },
      ];
      const grafanaIframe = document.getElementById('grafana-iframe');
      grafanaIframe.contentWindow.postMessage(message, srcIframe);
    };
    sendMessageToGrafana();
  }, [ts, temp]);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <DropdownMenuTs ts={ts} setTs={setTs} />
        <DropdownMenuTemp temp={temp} setTemp={setTemp} />
      </div>
      <iframe title={'grafana'} id={'grafana-iframe'} src={srcIframe} width="100%" height={800}></iframe>
    </>
  );
}

const DropdownMenuTs = ({ ts, setTs }) => {
  const [selectedOption, setSelectedOption] = useState(ts);


  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
    setTs(eventKey);
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {selectedOption}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="3h">3h</Dropdown.Item>
        <Dropdown.Item eventKey="6h">6h</Dropdown.Item>
        <Dropdown.Item eventKey="12h">12h</Dropdown.Item>
        <Dropdown.Item eventKey="1d">1d</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const DropdownMenuTemp = ({ temp, setTemp }) => {
  const [selectedOption, setSelectedOption] = useState(temp);


  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
    setTemp(eventKey);
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {selectedOption}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="1">1</Dropdown.Item>
        <Dropdown.Item eventKey="2">2</Dropdown.Item>
        <Dropdown.Item eventKey="3">3</Dropdown.Item>
        <Dropdown.Item eventKey="4">4</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default App;
