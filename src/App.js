import './App.css';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [ts, setTs] = useState('3h');
  const srcIframe = 'http://localhost:3000/myd-solo/dfd49481-ca4a-45c6-a24c-726af667750c/new-dashboard?orgId=1&var-ts=3h&panelId=1';
  useEffect(() => {
    const sendMessageToGrafana = () => {
      const message = {
        "var-ts": ts,
      };
      const grafanaIframe = document.getElementById('grafana-iframe');
      grafanaIframe.contentWindow.postMessage(message, srcIframe);
    };
    sendMessageToGrafana();
  }, [ts]);

  return (
    <>
      <DropdownMenu ts={ts} setTs={setTs} />
      <iframe title={'grafana'} id={'grafana-iframe'} src={srcIframe} width="100%" height={800}></iframe>
    </>
  );
}

const DropdownMenu = ({ ts, setTs }) => {
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

export default App;
