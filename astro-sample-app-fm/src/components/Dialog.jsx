import {RuxDialog} from '@astrouxds/react'

function Dialog ({currentItem}) {
    return(
        <RuxDialog header="Satellite Error" message="" confirm-text="OK" deny-text="Cancel">
            <div style={{'textAlign':'left'}}>
            <div><strong>Satellite: </strong>{currentItem.contactSatellite}</div>
            <div><strong>Details: </strong>{currentItem.contactDetail}</div>
            </div>
        </RuxDialog>
    )
}

export default Dialog