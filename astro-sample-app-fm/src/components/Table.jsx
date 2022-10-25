import { RuxTable, RuxTableBody } from '@astrouxds/react'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import { formatDate } from '../functions/functions'

//const tableTitleData = ['contactBeginTimestamp','contactEndTimestamp','contactDetail','contactName','contactSatellite','errorMessage','errorSeverity','errorTime']

function Table({handleArrowClick, sortDirection, alertData, returnAlertSeverity, openDialog, process}) {
    return (
        <RuxTable>
            <TableHeader handleArrowClick={handleArrowClick} sortDirection={sortDirection} alertData={alertData}></TableHeader>
            <RuxTableBody>
                {alertData && alertData.map((item, index) => {
                    return (
                        <TableRow index={index} item={item} formatDate={formatDate} returnAlertSeverity={returnAlertSeverity} openDialog={openDialog} process={process} alertData={alertData}></TableRow>
                    )
                })}
            </RuxTableBody>
        </RuxTable>
    )
}

export default Table