import imap from '../imap';
import {fetchStaffPositions} from '../api/staff';
import eventBus from './bus';
import {NOTIFY_STAFF_REMOVED, NOTIFY_STAFF_UPDATED} from '../events';
import NotificationService from './notification';
import {__} from '../helpers';

class StaffService {
    debug = false;

    constructor() {
        this.timeoutId = null;
        this.intervalInMs = imap.settings.staffApi.refreshInterval * 1000;

        this.staffList = {};
    }

    run() {
        this.refreshStaffList();
    }

    setTimeout() {
        this.timeoutId = setTimeout(() => this.refreshStaffList(), this.intervalInMs);
    }

    clearTimeout() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    debugLog(...messages) {
        if(this.debug) {
            console.log(...messages);
        }
    }

    refreshStaffList() {
        this.debugLog('refreshStaffList');
        this.clearTimeout();

        fetchStaffPositions()
            .then(staffList => {
                // noinspection JSIgnoredPromiseFromCall
                this.prepareStaffList(staffList);
            })
            .catch(err => NotificationService.error(__('Staff fetch failed')))
            .finally(() => this.setTimeout());
    }

    async prepareStaffList(staffList) {
        this.debugLog('fetchStaffPositions', staffList);
        let newStaffIdList = staffList.map(staff => staff.id);

        Object.keys(this.staffList)
            .filter(staffId => !newStaffIdList.include(staffId))
            .forEach(staffId => {
                this.debugLog('NOTIFY_STAFF_REMOVED', staffId, this.staffList[staffId]);
                eventBus.emit(NOTIFY_STAFF_REMOVED, null, this.staffList[staffId]);
                delete this.staffList[staffId];
            });

        staffList.forEach(staff => {
            if (!this.staffList.hasOwnProperty(staff.id)) {
                this.staffList[staff.id] = staff;
                this.debugLog('found new staff', staff.id);
            } else {
                this.staffList[staff.id].load(staff);
                staff = this.staffList[staff.id];
                this.debugLog('staff already exists', staff.id);
            }
            this.debugLog('NOTIFY_STAFF_UPDATED', staff.id, this.staffList[staff.id]);

            eventBus.emit(NOTIFY_STAFF_UPDATED, null, staff);
        });
    }
}

export default StaffService;