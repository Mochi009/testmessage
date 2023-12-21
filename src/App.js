import './App.css';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [ts, setTs] = useState('3h');
  const [panelId, setPanelId] = useState('1');
  // Url iframe, myd-solo è la route aggiunta nel mio grafana per l'iframe modificato
  const srcIframe = 'http://localhost:3000/myd-solo/c10d6588-f085-44d3-b9e6-9cf4043716ff/new-dashboard?orgId=1&var-ts=3h&panelId=1';
  //useEffect che usa la postMessage per notificare a grafana il cambio della variabile ts
  useEffect(() => {
    const sendMessageToGrafana = () => {
      const message = {
        variables: [
          { key: "ts", value: ts },]
      };
      const grafanaIframe = document.getElementById('grafana-iframe');
      grafanaIframe.contentWindow.postMessage(message, srcIframe);
    };
    sendMessageToGrafana();
  }, [ts]);

  //useEffect che usa la postMessage per notificare a grafana il cambio del panelId
  useEffect(() => {
    const sendMessageToGrafana = () => {
      const message = { panelId: panelId };
      const grafanaIframe = document.getElementById('grafana-iframe');
      grafanaIframe.contentWindow.postMessage(message, srcIframe);
    };
    sendMessageToGrafana();
  }, [panelId]);


  //Componente minimal per testare il funzionamento dell'iframe e l'aggioramento delle variabili
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        Time Range:
        <DropdownMenuTs ts={ts} setTs={setTs} />
        Panel ID:
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
        <Dropdown.Item eventKey="1h">1h</Dropdown.Item>
        <Dropdown.Item eventKey="2h">2h</Dropdown.Item>
        <Dropdown.Item eventKey="3h">3h</Dropdown.Item>
        <Dropdown.Item eventKey="4h">4h</Dropdown.Item>
        <Dropdown.Item eventKey="6h">6h</Dropdown.Item>
        <Dropdown.Item eventKey="12h">12h</Dropdown.Item>
        <Dropdown.Item eventKey="1d">1d</Dropdown.Item>
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
