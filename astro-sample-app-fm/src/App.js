import './App.css';
import data from './data.json'
import {RuxGlobalStatusBar, RuxStatus, RuxTable, RuxTableHeader, RuxTableHeaderCell, RuxTableBody, RuxTableRow, RuxTableCell, RuxTableHeaderRow, RuxButton, RuxCheckbox, RuxMonitoringIcon, RuxDialog} from '@astrouxds/react'
import { useState, Fragment, useEffect } from 'react';

function App() {
  const satData = data

  const [currentItem, setCurrentItem] = useState({});
  const [processed, setProcessed] = useState([]);

  const filteredData = satData.filter((data) => {
    return data.alerts[0];
  })

  const [alertData, setAlertData] = useState(filteredData)

  const processData = (modifiedAlertData) => {
    const processedData = modifiedAlertData.filter(data => data.isProcessed)
    const remainingAlertData = modifiedAlertData.filter(data => !data.isProcessed)

    setProcessed(processed.concat(processedData)); //because of batch update with React, processed will only contain one item if the new processed data is not pushed into the array
    setAlertData(remainingAlertData);
  }

  function openDialog(item) {
    setCurrentItem(item);
    const dialog = document.querySelector('rux-dialog');
    dialog.open = true;
  }

  const alerts = ['off','standby','normal','caution','serious','critical']

  function returnAlertSeverity(severity) {
    return (
      <div style={{'display': 'flex', 'alignItems': 'center'}}>
        <RuxStatus status={!alerts.includes(severity) ? 'off' : severity}></RuxStatus>
        {severity}
      </div>
    )
  }

  function process(item) {
    setCurrentItem(item)

    //create new array instead of modifying the original
    const modifiedAlertData = alertData.map(alert => {
      if(item === alert) {
        return {...alert, isProcessed:true}
      } else {
        return alert
      }
    })
    processData(modifiedAlertData)
  }

  //format time
  const formatDate = (timestamp, year) => {
    //convert from unix time to milliseconds
    let date = new Date(timestamp);
    if (year) {
      date = new Intl.DateTimeFormat('en-US', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC',
      }).format(date);
    } else {
      date = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC',
      }).format(date);
    }
    return date;
  };
  
  return (
    <div className="App" width="100%">
      <header className="AppHeader">
        <div className="status-bar">
            <RuxGlobalStatusBar include-icon="true" app-domain="Astro" app-name="FM Sample Dashboard" app-version="1.0 Alpha" menu-icon="apps" username="" app-state-color="" app-state="">
            </RuxGlobalStatusBar>
        </div>
      </header>
      <div className="content">
              <RuxTable>
                <RuxTableHeader>
                  <RuxTableHeaderRow>
                    <RuxTableHeaderCell>Satellite Name</RuxTableHeaderCell>
                    <RuxTableHeaderCell>Contact Name</RuxTableHeaderCell>
                    <RuxTableHeaderCell>Contact Duration</RuxTableHeaderCell>
                    <RuxTableHeaderCell>Alert</RuxTableHeaderCell>
                    <RuxTableHeaderCell>Severity</RuxTableHeaderCell>
                    <RuxTableHeaderCell>Alert Time</RuxTableHeaderCell>
                    <RuxTableHeaderCell>Details</RuxTableHeaderCell>
                    <RuxTableHeaderCell></RuxTableHeaderCell>
                  </RuxTableHeaderRow>
                </RuxTableHeader>
                <RuxTableBody>
                  {alertData.map((item, index) => {
                    return (
                      <Fragment key={index}>
                      {item.alerts.map((alert, index) => {
                        return (
                          <RuxTableRow key={`${item.contactName}-${index}`}>
                            <RuxTableCell>{item.contactSatellite}</RuxTableCell>
                            <RuxTableCell>{item.contactName}</RuxTableCell>
                            <RuxTableCell>{formatDate(item.contactBeginTimestamp)} - {formatDate(item.contactEndTimestamp)}</RuxTableCell>
                            <RuxTableCell>{alert.errorMessage}</RuxTableCell>
                            <RuxTableCell>{returnAlertSeverity(alert.errorSeverity)}</RuxTableCell>
                            <RuxTableCell>{formatDate(alert.errorTime)}</RuxTableCell>
                            <RuxTableCell>
                              <RuxButton secondary size={'small'} onClick={() => openDialog(item)}>SHOW DETAILS</RuxButton>
                            </RuxTableCell>
                            <RuxTableCell>
                              <RuxButton size="small" onClick={() => process(item)}>PROCESS ALERT</RuxButton>
                            </RuxTableCell>
                          </RuxTableRow>
                        )
                      })}
                      </Fragment>
                    ) 
                  })}
                </RuxTableBody>
              </RuxTable>
              <h2>PROCESSED</h2>

                  <RuxTable>
                  <RuxTableHeader>
                    <RuxTableHeaderRow>
                      <RuxTableHeaderCell>Satellite Name</RuxTableHeaderCell>
                      <RuxTableHeaderCell>Contact Name</RuxTableHeaderCell>
                      <RuxTableHeaderCell>Contact Duration</RuxTableHeaderCell>
                      <RuxTableHeaderCell>Alert</RuxTableHeaderCell>
                      <RuxTableHeaderCell>Severity</RuxTableHeaderCell>
                      <RuxTableHeaderCell>Alert Time</RuxTableHeaderCell>
                      <RuxTableHeaderCell>Details</RuxTableHeaderCell>
                    </RuxTableHeaderRow>
                  </RuxTableHeader>
                  <RuxTableBody>
                  {processed && processed.map((item, index) => {
                    return (
                      <Fragment key={index}>
                      {item.alerts.map((alert, index) => {
                        return (
                          <RuxTableRow key={`${item.contactName}-${index}`}>
                            <RuxTableCell>{item.contactSatellite}</RuxTableCell>
                            <RuxTableCell>{item.contactName}</RuxTableCell>
                            <RuxTableCell>{formatDate(item.contactBeginTimestamp)} - {formatDate(item.contactEndTimestamp)}</RuxTableCell>
                            <RuxTableCell>{alert.errorMessage}</RuxTableCell>
                            <RuxTableCell>{returnAlertSeverity(alert.errorSeverity)}</RuxTableCell>
                            <RuxTableCell>{formatDate(alert.errorTime)}</RuxTableCell>
                            <RuxTableCell>
                              <RuxButton secondary size={'small'} onClick={() => openDialog(item)}>SHOW DETAILS</RuxButton>
                            </RuxTableCell>
                            <RuxTableCell>
                            </RuxTableCell>
                          </RuxTableRow>
                        )
                      })}
                      </Fragment>
                    ) 
                  })}
                    {/* {processed && processed.map((item, index) => {
                      return (
                        <RuxTableRow key={index}>
                          <RuxTableCell>{item.contactSatellite}</RuxTableCell>
                          <RuxTableCell>{item.contactName}</RuxTableCell>
                          <RuxTableCell>{new Date(item.contactBeginTimestamp).toTimeString()}</RuxTableCell>
                          <RuxTableCell>{new Date(item.contactEndTimestamp).toTimeString()}</RuxTableCell>
                          <RuxTableCell>{item.alerts[0] ? item.alerts[0].errorMessage : ''}</RuxTableCell>
                          <RuxTableCell>{item.alerts[0] ? returnAlertSeverity(item, item.alerts[0].errorSeverity) : ''}</RuxTableCell>
                          <RuxTableCell>{item.alerts[0] ? new Date(item.alerts[0].errorTime).toTimeString() : ''}</RuxTableCell>
                          <RuxTableCell>
                            {item.alerts[0] ? <RuxButton secondary size={'small'} onClick={() => openDialog(item)}>SHOW DETAILS</RuxButton> : ''}
                          </RuxTableCell>
                        </RuxTableRow>
                      )
                    })} */}
                  </RuxTableBody>
                  </RuxTable>
              <div>
                <RuxDialog header="Satellite Error" message="" confirm-text="OK" deny-text="Cancel">
                  <div style={{'textAlign':'left'}}>
                    <div><strong>Satellite: </strong>{currentItem.contactSatellite}</div>
                    <div><strong>Details: </strong>{currentItem.contactDetail}</div>
                  </div>
                </RuxDialog>
              </div>
      </div>
    </div>
  );
}

export default App;
