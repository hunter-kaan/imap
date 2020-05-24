class StaffIcon extends L.DivIcon {
    constructor(marker) {
        let classNames = ['staff-status'];

        if (marker.isUnknown()) {
            classNames.push('staff-status-unknown');
        } else if (marker.isInactive()) {
            classNames.push('staff-status-inactive');
        } else {
            classNames.push('staff-status-active');
        }

        let image = new Image();
        image.src = '/imap/images/staff.png';

        let name = L.DomUtil.create('div', 'marker-staff-name');
        name.innerText = marker.staffName;

        let container = L.DomUtil.create('div', 'staff-marker');
        container.append(image, name);


        super({
            className: classNames.join(' '),
            html: container,
            iconAnchor: [8, 8]
        });
    }

}

export default StaffIcon;