import ClusterStaffIcon from "../../views/map/marker/cluster-staff-icon";

class StaffIconCreator {
    static build(cluster) {
        let childMarkers = cluster.getAllChildMarkers();
        let counters = {
            active: 0,
            inactive: 0,
            unknown: 0,
        };

        childMarkers.forEach(staffMarker => {
            if (!staffMarker.lastPosition) {
                counters.unknown++;
            } else if (Date.now() - staffMarker.lastPosition.timestamp > 300000) {
                counters.inactive++;
            } else {
                counters.active++;
            }
        });

        return new ClusterStaffIcon({
            counters: counters,
        });
    }

}

export default StaffIconCreator;