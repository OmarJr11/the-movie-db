import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    private key: string = 'myList'; 

    constructor() {}

    set(value: any) {
        localStorage.setItem(this.key, JSON.stringify(value));
    }

    get() {
        const storage = localStorage.getItem(this.key);
        return storage ? JSON.parse(storage) : null;
    }

    remove() {
        localStorage.removeItem(this.key);
    }

    clear() {
        localStorage.clear();
    }
}  