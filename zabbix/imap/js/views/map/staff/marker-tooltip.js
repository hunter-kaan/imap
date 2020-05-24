import imap from '../../../imap';
import {__} from '../../../helpers';

class StaffMarkerTooltip extends L.Tooltip {
    constructor() {
        super({
            offset: [-12, 0],
            direction: 'left',
            permanent: false,
        });

        this.useIconsInMarkers = imap.settings.useIconsInMarkers;
    }

    /**
     * @param marker {StaffMarker}
     */
    updateContent(marker) {
        let labelContent = L.DomUtil.create('div', '');
        labelContent.append(marker.staffName + ': ');
        if (marker.isUnknown()) {
            labelContent.append(__('Last time unknown'));
        } else {
            labelContent.append(marker.lastTimestamp.fromNow());
        }


        this.setContent(labelContent);
    }
}

export default StaffMarkerTooltip;