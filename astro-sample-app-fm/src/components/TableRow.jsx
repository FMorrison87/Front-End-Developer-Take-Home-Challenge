import {RuxTableRow, RuxTableCell, RuxButton} from '@astrouxds/react'

function TableRow({index, item, formatDate, returnAlertSeverity, openDialog, process, alertData}) {
    return(
        <RuxTableRow key={`${item.contactName}-${index}`}>
            <RuxTableCell>{item.contactSatellite}</RuxTableCell>
            <RuxTableCell>{item.contactName}</RuxTableCell>
            <RuxTableCell>{formatDate(item.contactBeginTimestamp)} - {formatDate(item.contactEndTimestamp)}</RuxTableCell>
            <RuxTableCell>{item.errorMessage}</RuxTableCell>
            <RuxTableCell>{returnAlertSeverity(item.errorSeverity)}</RuxTableCell>
            <RuxTableCell>{formatDate(item.errorTime)}</RuxTableCell>
            <RuxTableCell>
                <RuxButton secondary size={'small'} onClick={() => openDialog(item)}>SHOW DETAILS</RuxButton>
            </RuxTableCell>
            <RuxTableCell>
                {!alertData[0].isProcessed ? <RuxButton size="small" onClick={() => process(item)}>PROCESS ALERT</RuxButton> : ''}
            </RuxTableCell>
        </RuxTableRow>
    )
}

export default TableRow