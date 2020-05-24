class ClusterStaffIcon extends L.DivIcon {
    constructor({
                    counters: {
                        active,
                        inactive,
                        unknown,
                    },
                }) {
        let status = 'active';
        if(inactive > 0) {
            status = 'inactive';
        }
        else if(unknown > 0) {
            status = 'unknown';
        }
        super({
            // TODO: staff icon
            className: `staff-status-cluster staff-status-${status}`,
            html: `<div class="status-counters"><span class="status-ok">${active}/</span>` +
                `<span class="status-problem">${inactive}/</span>` +
                `<span class="status-maintenance">${unknown}</span></div>`,
            iconAnchor: [14, 14]
        });
    }
}

export default ClusterStaffIcon;