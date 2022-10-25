import {RuxTableHeader, RuxTableHeaderRow, RuxTableHeaderCell, RuxIcon} from '@astrouxds/react'

function TableHeader({sortDirection, handleArrowClick, alertData}) {
    return(
        <RuxTableHeader>
            <RuxTableHeaderRow>
                <RuxTableHeaderCell>
                    Satellite Name
                    {(alertData.length > 0 && !alertData[0].isProcessed) ? <RuxIcon size="20px" icon="keyboard-arrow-down" onClick={(event) => handleArrowClick(event, 'contactSatellite', sortDirection)}></RuxIcon> : ''}
                </RuxTableHeaderCell>
                <RuxTableHeaderCell>Contact Name{(alertData.length > 0 && !alertData[0].isProcessed) ? <RuxIcon size="20px" icon="keyboard-arrow-down" onClick={(event) => handleArrowClick(event, 'contactName', sortDirection)}></RuxIcon> : ''}</RuxTableHeaderCell>
                <RuxTableHeaderCell>Contact Duration</RuxTableHeaderCell>
                <RuxTableHeaderCell>Alert{(alertData.length > 0 && !alertData[0].isProcessed) ? <RuxIcon size="20px" icon="keyboard-arrow-down" onClick={(event) => handleArrowClick(event, 'errorMessage', sortDirection)}></RuxIcon> : ''}</RuxTableHeaderCell>
                <RuxTableHeaderCell>Severity{(alertData.length > 0 && !alertData[0].isProcessed) ? <RuxIcon size="20px" icon="keyboard-arrow-down" onClick={(event) => handleArrowClick(event, 'errorSeverity', sortDirection)}></RuxIcon> : ''}</RuxTableHeaderCell>
                <RuxTableHeaderCell>Alert Time{(alertData.length > 0 && !alertData[0].isProcessed) ? <RuxIcon size="20px" icon="keyboard-arrow-down" onClick={(event) => handleArrowClick(event, 'errorTime', sortDirection)}></RuxIcon> : ''}</RuxTableHeaderCell>
                <RuxTableHeaderCell>Details</RuxTableHeaderCell>
                <RuxTableHeaderCell></RuxTableHeaderCell>
            </RuxTableHeaderRow>
        </RuxTableHeader>
    )
}

export default TableHeader