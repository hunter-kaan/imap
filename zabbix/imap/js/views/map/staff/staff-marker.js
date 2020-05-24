import StaffMarkerTooltip from './marker-tooltip';
import StaffIcon from './staff-icon';
import moment from 'moment';

class StaffMarker extends L.Marker {
    constructor() {
        super();

        this.staffName = null;
        this.lastTimestamp = null;
        this.lastPosition = null;
    }

    updateByStaff(staff) {
        this.staffName = staff.title;
        this.lastPosition = staff.lastPosition;
        this.lastTimestamp = null;
        if (staff.lastPosition) {
            this.lastTimestamp = moment.unix(staff.lastPosition.timestamp);
        }

        this.updateView();
    }

    isUnknown() {
        return !this.lastTimestamp;
    }

    isInactive() {
        return moment().clone().subtract(5, 'minute').isAfter(this.lastTimestamp);
    }

    updatePosition(nextLat, nextLng) {
        let currentLat, currentLng;
        if (this._preSpiderfyLatlng) {
            currentLat = this._preSpiderfyLatlng.lat;
            currentLng = this._preSpiderfyLatlng.lng;
        } else {
            currentLat = this._latlng ? this._latlng.lat : null;
            currentLng = this._latlng ? this._latlng.lng : null;
        }

        if (currentLat !== nextLat || currentLng !== nextLng) {
            this.setLatLng([nextLat, nextLng]);
        }
    }

    updateView() {
        if (!this._tooltip) {
            this.bindTooltip(new StaffMarkerTooltip());
        }
        this._tooltip.updateContent(this);

        this.setIcon(new StaffIcon(this));
    }

    updateIconByParent() {
        let marker = this;

        while (marker) {
            marker = marker.__parent;
            if (marker) {
                marker._updateIcon();
                if (marker.__iconObj) {
                    marker.setIcon(marker.__iconObj);
                }
            }
        }
    }
}


export default StaffMarker;