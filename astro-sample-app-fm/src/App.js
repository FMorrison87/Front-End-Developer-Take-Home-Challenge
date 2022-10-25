import './App.css';
import data from './data.json'
import Table from './components/Table'
import Dialog from './components/Dialog'
import {RuxGlobalStatusBar, RuxStatus} from '@astrouxds/react'
import { useState } from 'react';

function App() {

  const [currentItem, setCurrentItem] = useState({});
  const [processed, setProcessed] = useState([]);
  const [sortDirection, setSortDirection] = useState('descend');

  const filteredData = data.filter((data) => {
    return data.alerts[0];
  })

  // Building a new array where 'Alerts' is not nested within each object
  const newData = filteredData.map(item => {
      item.alerts.forEach(alert => {
        item.errorMessage = alert.errorMessage
        item.errorSeverity = alert.errorSeverity
        item.errorSeverity = alert.errorSeverity
        item.errorTime = alert.errorTime
      })
      return item
    })

  const [alertData, setAlertData] = useState(newData)

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

  // function taken from here: https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/ (and then heavily modified)
  function compareValues(key, order) {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
      let varA = a[key]
      let varB = b[key]
      if (alerts.includes(a[key]) && alerts.includes(b[key])) {
        switch(a[key]) {
          case 'off':
            varA = 0;
            break
          case 'standby':
            varA = 1;
            break
          case 'normal':
            varA = 2;
              break
          case 'caution':
            varA = 3;
            break
          case 'serious':
            varA = 4;
            break
          case 'critical':
            varA = 5;
            break
          default:
            varA = 0;
            break
        }
        switch(b[key]) {
          case 'off':
            varB = 0;
            break
          case 'standby':
            varB = 1;
            break
          case 'normal':
            varB = 2;
              break
          case 'caution':
            varB = 3;
            break
          case 'serious':
            varB = 4;
            break
          case 'critical':
            varB = 5;
            break
          default:
            varB = 0;
            break
        }
      } else {
        varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
        varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
      }
        
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'descend') ? (comparison * -1) : comparison
      );
    };
  }

  function handleArrowClick(event, key, direction) {
      (direction === 'descend') ? setSortDirection('ascend') : setSortDirection('descend')
      const modifiedAlertData = alertData.sort(compareValues(key, sortDirection));
      processData(modifiedAlertData)
      event.currentTarget.classList.contains('arrow__sort-up') ? event.currentTarget.classList.remove('arrow__sort-up') : event.currentTarget.classList.add('arrow__sort-up')
  }
  
  return (
    <div className="App" width="100%">
      <header className="AppHeader">
          <RuxGlobalStatusBar include-icon="true" app-domain="Astro" app-name="FM Sample Dashboard" app-version="1.0 Alpha" menu-icon="apps" username="" app-state-color="" app-state="">
          </RuxGlobalStatusBar>
      </header>
      <div className="content">
          <Table handleArrowClick={handleArrowClick} sortDirection={sortDirection} alertData={alertData} returnAlertSeverity={returnAlertSeverity} openDialog={openDialog} process={process} />
              
          <h2>PROCESSED</h2>

          <Table handleArrowClick={handleArrowClick} sortDirection={sortDirection} alertData={processed} returnAlertSeverity={returnAlertSeverity} openDialog={openDialog} process={process} />
          <Dialog currentItem={currentItem} />
      </div>
    </div>
  );
}

export default App;
