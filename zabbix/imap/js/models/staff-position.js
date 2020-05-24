class StaffPosition {
    id = null;
    lat = null;
    lng = null;
    device = null;
    timestamp = null;

    load(data) {
        Object.assign(this, data);

        return this;
    }
}

export default StaffPosition;