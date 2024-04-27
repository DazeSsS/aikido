import { makeAutoObservable } from 'mobx';

class UserStore {
    role = '';

    constructor() {
        makeAutoObservable(this);
    }

    setRole(role) {
        this.role = role;
    }
}

const userStore = new UserStore();
export default userStore;