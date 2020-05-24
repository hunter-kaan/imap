import StaffPosition from './staff-position';

class Staff {
    id = null;
    title = null;
    lastPosition = null;

    load(data) {
        if (data.hasOwnProperty('lastPosition') && data['lastPosition']) {
            data.lastPosition = new StaffPosition().load(data['lastPosition']);
        }

        Object.assign(this, data);

        return this;
    }
}

export default Staff;