import './App.css';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const srcIframe = 'http://localhost:3000/myd-solo/b11306be-09b9-456d-9407-de505283dc10/new-dashboard?orgId=1&from=1699535636799&to=1699557236799&panelId=1';
  const sendMessageToGrafana = message => {
    const grafanaIframe = document.getElementById('grafana-iframe');
    grafanaIframe.contentWindow.postMessage(message, srcIframe);
  };

  return (
    <>
      <DropdownMenu onChangeTime={sendMessageToGrafana} />
      <iframe title={'grafana'} id={'grafana-iframe'} src={srcIframe} width="100%" height={800}></iframe>
    </>
  );
}

const DropdownMenu = ({ onChangeTime }) => {
  const [selectedOption, setSelectedOption] = useState('3h');


  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
    onChangeTime(eventKey);
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

export default App;
