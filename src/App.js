import './App.css';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [ts, setTs] = useState('3h');
  const [temp, setTemp] = useState('1');
  const [panelId, setPanelId] = useState('1');
  const srcIframe = 'http://localhost:3000/myd-solo/f813b13e-a48f-4343-9f3e-c55906c5430b/new-dashboard?orgId=1&var-ts=3h&panelId=1';

  useEffect(() => {
    const sendMessageToGrafana = () => {
      const message = {
        variables: [
          { key: "ts", value: ts },
          { key: "temp", value: ts },
        ]
      };
      const grafanaIframe = document.getElementById('grafana-iframe');
      grafanaIframe.contentWindow.postMessage(message, srcIframe);
    };
    sendMessageToGrafana();
  }, [ts, temp]);

  useEffect(() => {
    const sendMessageToGrafana = () => {
      const message = { panelId: panelId };
      const grafanaIframe = document.getElementById('grafana-iframe');
      grafanaIframe.contentWindow.postMessage(message, srcIframe);
    };
    sendMessageToGrafana();
  }, [panelId]);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <DropdownMenuTs ts={ts} setTs={setTs} />
        <DropdownMenuTemp temp={temp} setTemp={setTemp} />
        <DropdownMenuPanelId panelId={panelId} setPanelId={setPanelId} />
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
        <Dropdown.Item eventKey='1'>1</Dropdown.Item>
        <Dropdown.Item eventKey="2">2</Dropdown.Item>
        <Dropdown.Item eventKey="3">3</Dropdown.Item>
        <Dropdown.Item eventKey="4">4</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const DropdownMenuPanelId = ({ panelId, setPanelId }) => {
  const [selectedOption, setSelectedOption] = useState(panelId);


  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
    setPanelId(eventKey);
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
