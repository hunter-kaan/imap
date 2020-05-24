import imap from '../imap';
import axios from 'axios';
import Staff from '../models/staff';

export const fetchStaffPositions = () => {
    return new Promise(((resolve, reject) => {
        let config = undefined;
        if (imap.settings.staffApi.authHeaders) {
            config = {headers: imap.settings.staffApi.authHeaders};
        }
        axios.get(imap.settings.staffApi.url, config)
            .then(response => {
                const staffList = response.data.map(staffData => new Staff().load(staffData));

                resolve(staffList);
            }).catch(response => reject(response));
    }))
};