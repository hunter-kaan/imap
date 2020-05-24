import StaffClusterIconCreator from '../../../services/map/staff-cluster-icon-creator';
import imap from '../../../imap';
import eventBus from '../../../services/bus';
import {NOTIFY_STAFF_REMOVED, NOTIFY_STAFF_UPDATED} from '../../../events';
import StaffMarker from '../staff/staff-marker';

class StaffClusterGroup extends L.MarkerClusterGroup {
    constructor() {
        super({
            maxClusterRadius: 30,
            spiderfyDistanceMultiplier: imap.settings.spiderfyDistanceMultiplier,
            iconCreateFunction: StaffClusterIconCreator.build,
        });

        this.markerList = {};

        this.defaultLatLng = imap.settings.startCoordinates;

        this.on('clustercontextmenu', (a) => {
            if ((a.layer._childCount < imap.settings.maxMarkersSpiderfy) || (map.getMaxZoom() === map.getZoom())) {
                a.layer.spiderfy();
            } else {
                a.layer.zoomToBounds();
            }
        });

        eventBus.on(NOTIFY_STAFF_UPDATED, (staff) => this.onStaffUpdated(staff));
        eventBus.on(NOTIFY_STAFF_REMOVED, (staff) => this.onStaffRemoved(staff));
    }


    onStaffUpdated(staff) {
        if (!this.markerList.hasOwnProperty(staff.id)) {
            this.markerList[staff.id] = new StaffMarker();
        }

        let marker = this.markerList[staff.id];
        if (staff.lastPosition) {
            marker.updatePosition(staff.lastPosition.lat, staff.lastPosition.lng);
        } else {
            marker.updatePosition(this.defaultLatLng[0], this.defaultLatLng[1]);
        }


        marker.updateByStaff(staff);
        marker.updateView();
        if (!this.hasLayer(marker)) {
            this.addLayer(marker);
        }

        marker.updateIconByParent();
    }

    onStaffRemoved(staff) {
        if (this.markerList.hasOwnProperty(staff.id)) {
            this.removeLayer(this.markerList[staff.id]);
            delete this.markerList[staff.id];
        }
    }
}

export default StaffClusterGroup;