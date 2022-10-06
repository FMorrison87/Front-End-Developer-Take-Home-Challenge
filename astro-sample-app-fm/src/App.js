import './App.css';
import data from './data.json'
import {RuxGlobalStatusBar, RuxStatus, RuxTable, RuxTableHeader, RuxTableHeaderCell, RuxTableBody, RuxTableRow, RuxTableCell, RuxTableHeaderRow, RuxButton, RuxIcon, RuxMonitoringIcon, RuxDialog} from '@astrouxds/react'
import { useState } from 'react';

const satData = data
console.log(satData)

function App() {

  const [currentItem, setCurrentItem] = useState({});

  function openDialog(item) {
    setCurrentItem(item);
    const dialog = document.querySelector('rux-dialog');
    dialog.open = true;
  }

  function returnAlertSeverity(item, severity) {
    return (
      <div style={{'display': 'flex'}}>
        <RuxStatus status={severity}></RuxStatus>
        {item.alerts[0].errorSeverity}
      </div>
    )
  }
  
  return (
    <div className="App">
      <header className="AppHeader">
        <div className="status-bar">
            <RuxGlobalStatusBar include-icon="true" app-domain="Astro" app-name="FM Sample Dashboard" app-version="1.0 Alpha" menu-icon="apps" username="" app-state-color="" app-state="">
            </RuxGlobalStatusBar>
        </div>
      </header>

      <RuxTable>
          <RuxTableHeader>
            <RuxTableHeaderRow>
              <RuxTableHeaderCell>Satellite Name</RuxTableHeaderCell>
              <RuxTableHeaderCell>Contact Name</RuxTableHeaderCell>
              <RuxTableHeaderCell>Contact Time Begin</RuxTableHeaderCell>
              <RuxTableHeaderCell>Contact Time End</RuxTableHeaderCell>
              <RuxTableHeaderCell>Alert</RuxTableHeaderCell>
              <RuxTableHeaderCell>Severity</RuxTableHeaderCell>
              <RuxTableHeaderCell>Alert Time</RuxTableHeaderCell>
              <RuxTableHeaderCell>Details</RuxTableHeaderCell>
            </RuxTableHeaderRow>
          </RuxTableHeader>
          <RuxTableBody>
            {satData.map((item, index) => {
              return (
                <RuxTableRow key={index}>
                  <RuxTableCell>{item.contactSatellite}</RuxTableCell>
                  <RuxTableCell>{item.contactName}</RuxTableCell>
                  <RuxTableCell>{item.contactBeginTimestamp}</RuxTableCell>
                  <RuxTableCell>{item.contactEndTimestamp}</RuxTableCell>
                  <RuxTableCell>{item.alerts[0] ? item.alerts[0].errorMessage : ''}</RuxTableCell>
                  <RuxTableCell>{item.alerts[0] ? returnAlertSeverity(item) : ''}</RuxTableCell>
                  <RuxTableCell>{item.alerts[0] ? new Date(item.alerts[0].errorTime).toTimeString() : ''}</RuxTableCell>
                  <RuxTableCell>
                    {item.alerts[0] ? <RuxButton secondary size={'small'} onClick={() => openDialog(item)}>SHOW DETAILS</RuxButton> : ''}
                  </RuxTableCell>
                </RuxTableRow>
              )
            })}
          </RuxTableBody>
        </RuxTable>
        <div>
          <RuxDialog header="Satellite Error" message="" confirm-text="Release" deny-text="Cancel">
            <div>
              {/* <div>{currentItem.alerts[0] ? currentItem.alerts[0].errorMessage: ''}</div> */}
              <div>{currentItem.contactName}</div>
              <div>Begin Time:{new Date(currentItem.contactBeginTimestamp).toTimeString()}</div>
              <div>End Time:{new Date(currentItem.contactEndTimestamp).toTimeString()}</div>
            </div>
          </RuxDialog>
        </div>
    </div>
  );
}

export default App;
